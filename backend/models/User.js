import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "member" },
    status: { type: String, default: "active" }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
