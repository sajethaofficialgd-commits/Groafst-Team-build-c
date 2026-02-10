import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true }
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model("ActivityLog", logSchema);
