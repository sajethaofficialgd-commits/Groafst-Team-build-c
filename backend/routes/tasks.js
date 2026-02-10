import express from "express";
import { Task } from "../models/Task.js";
import { Notification } from "../models/Notification.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post("/", authRequired, async (req, res) => {
  const task = await Task.create(req.body);
  const notification = await Notification.create({
    type: "task",
    message: `New task: ${task.title}`,
    userId: task.assigneeId || null
  });
  const io = req.app.get("io");
  if (io) {
    if (notification.userId) io.to(`user:${notification.userId}`).emit("notification", notification);
    else io.emit("notification", notification);
  }
  res.status(201).json(task);
});

router.put("/:id", authRequired, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

export default router;
