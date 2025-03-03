import express from "express";
import cors from "cors";
import app from "./src/app.js";
import router from "./src/routes/ai.routes.js";

const PORT = process.env.PORT || 4001;


app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/ai", router);

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`));
