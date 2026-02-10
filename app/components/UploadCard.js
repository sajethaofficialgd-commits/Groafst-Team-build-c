"use client";

import { useState } from "react";

export default function UploadCard() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") return alert("Admins only");

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/documents`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    setUploading(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      return alert(payload.message || "Upload failed");
    }

    alert("Upload successful");
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold">Document Upload</h3>
      <p className="text-sm text-[var(--muted)] mt-1">
        Share files and documents with your team.
      </p>
      <div className="mt-4">
        <label className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--border)] cursor-pointer">
          <input type="file" className="hidden" onChange={handleUpload} />
          <span>{uploading ? "Uploading..." : "Upload File"}</span>
        </label>
      </div>
    </div>
  );
}
