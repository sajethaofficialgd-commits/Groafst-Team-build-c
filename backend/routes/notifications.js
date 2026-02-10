import express from "express";
import { Notification } from "../models/Notification.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const filter = req.user.role === "admin"
    ? {}
    : { $or: [{ userId: req.user.id }, { userId: null }] };
  const items = await Notification.find(filter).sort({ createdAt: -1 }).limit(50);
  res.json(items);
});

export default router;
