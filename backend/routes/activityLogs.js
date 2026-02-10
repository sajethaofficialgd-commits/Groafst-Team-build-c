import express from "express";
import { ActivityLog } from "../models/ActivityLog.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const items = await ActivityLog.find();
  res.json(items);
});

export default router;
