import express from "express";
import { Attendance } from "../models/Attendance.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const items = await Attendance.find();
  res.json(items);
});

router.post("/check-in", authRequired, async (req, res) => {
  const item = await Attendance.create(req.body);
  res.status(201).json(item);
});

router.post("/check-out", authRequired, async (req, res) => {
  const item = await Attendance.create(req.body);
  res.status(201).json(item);
});

export default router;
