import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, default: "active" },
    timeline: { type: String },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
