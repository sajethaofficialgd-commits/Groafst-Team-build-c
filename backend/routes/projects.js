import express from "express";
import { Project } from "../models/Project.js";
import { authRequired } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post("/", authRequired, async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

export default router;
