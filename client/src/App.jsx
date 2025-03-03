import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState(`
function sum() {
  return 1+1
}`);

  const [review, setReview] = useState();

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    const res = await axios.post("http://localhost:4000/ai/get-review", {
      code,
    });
    setReview(res.data);
  };

  return (
    <div className="flex p-5  bg-gray-500 items-center justify-between gap-4 h-screen w-full">
      <div className="overflow-auto relative bg-black w-full h-full rounded-sm text-white p-10">
        <div>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono",monospace',
              fontSize: 16,

              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <button
          onClick={reviewCode}
          className="cursor-pointer absolute bottom-1 right-1"
        >
          Review
        </button>
      </div>
      <div className="w-full h-full overflow-auto text-xl bg-gray-600 p-10  rounded-sm">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </div>
  );
};

export default App;
