import express from "express";
import { LeaveRequest } from "../models/LeaveRequest.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const items = await LeaveRequest.find();
  res.json(items);
});

router.post("/", authRequired, async (req, res) => {
  const item = await LeaveRequest.create(req.body);
  res.status(201).json(item);
});

router.put("/:id", authRequired, async (req, res) => {
  const item = await LeaveRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

export default router;
