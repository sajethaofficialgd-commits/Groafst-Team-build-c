import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: true },
    checkIn: { type: String },
    checkOut: { type: String },
    status: { type: String, default: "present" }
  },
  { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
