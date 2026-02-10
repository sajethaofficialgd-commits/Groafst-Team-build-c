import express from "express";
import { User } from "../models/User.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, requireRole("admin"), async (req, res) => {
  const users = await User.find().select("-passwordHash");
  res.json(users);
});

router.post("/", authRequired, requireRole("admin"), async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.put("/:id", authRequired, requireRole("admin"), async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

router.delete("/:id", authRequired, requireRole("admin"), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
