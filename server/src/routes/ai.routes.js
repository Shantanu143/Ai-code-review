import express from "express";
import {  getReview } from "../controller/ai.controller.js";

const router = express.Router();

router.post("/get-review", getReview);

export default router;
