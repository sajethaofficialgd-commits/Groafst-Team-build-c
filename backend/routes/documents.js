import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { authRequired, requireRole } from "../middleware/auth.js";
import { Document } from "../models/Document.js";
import { Notification } from "../models/Notification.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = process.env.UPLOAD_DIR || "uploads";
const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", uploadDir),
  filename: (req, file, cb) => {
    const stamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${stamp}_${safeName}`);
  }
});

const upload = multer({ storage });

router.get("/", authRequired, async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 });
  res.json(docs);
});

router.post("/", authRequired, requireRole("admin"), upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const doc = await Document.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    uploadedBy: req.user.id
  });

  const notification = await Notification.create({
    type: "document",
    message: `New file: ${doc.originalName}`
  });

  const io = req.app.get("io");
  if (io) io.emit("notification", notification);

  res.status(201).json(doc);
});

router.patch("/:id", authRequired, requireRole("admin"), async (req, res) => {
  const { originalName } = req.body;
  if (!originalName) return res.status(400).json({ message: "Missing name" });
  const doc = await Document.findByIdAndUpdate(req.params.id, { originalName }, { new: true });
  res.json(doc);
});

router.delete("/:id", authRequired, requireRole("admin"), async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });

  const filePath = path.join(__dirname, "..", uploadDir, doc.filename);
  await Document.findByIdAndDelete(req.params.id);
  await fs.unlink(filePath).catch(() => null);

  res.status(204).end();
});

export default router;
