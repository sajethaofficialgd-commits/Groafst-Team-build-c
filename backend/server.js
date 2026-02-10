import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import projectRoutes from "./routes/projects.js";
import attendanceRoutes from "./routes/attendance.js";
import leaveRoutes from "./routes/leaveRequests.js";
import announcementRoutes from "./routes/announcements.js";
import activityRoutes from "./routes/activityLogs.js";
import reportRoutes from "./routes/reports.js";
import documentRoutes from "./routes/documents.js";
import notificationRoutes from "./routes/notifications.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Missing token"));
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = payload;
    socket.join(`user:${payload.id}`);
    return next();
  } catch (error) {
    return next(new Error("Invalid token"));
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = process.env.UPLOAD_DIR || "uploads";

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());
app.use(`/${uploadDir}`, express.static(path.join(__dirname, uploadDir)));

app.get("/", (req, res) => {
  res.json({ status: "GROFAST DIGITAL API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave-requests", leaveRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/activity-logs", activityRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/notifications", notificationRoutes);

io.on("connection", (socket) => {
  socket.emit("notification", { type: "system", message: "Connected to GROFAST DIGITAL" });
});

const port = process.env.PORT || 5000;

connectDb(process.env.MONGODB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Mongo connection failed", error);
    process.exit(1);
  });
