import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export const LeaveRequest = mongoose.model("LeaveRequest", leaveSchema);
