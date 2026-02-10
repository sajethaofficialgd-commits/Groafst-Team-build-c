import express from "express";
import { Announcement } from "../models/Announcement.js";
import { Notification } from "../models/Notification.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const items = await Announcement.find();
  res.json(items);
});

router.post("/", authRequired, async (req, res) => {
  const item = await Announcement.create(req.body);
  const notification = await Notification.create({
    type: "announcement",
    message: item.title
  });
  const io = req.app.get("io");
  if (io) io.emit("notification", notification);
  res.status(201).json(item);
});

export default router;
