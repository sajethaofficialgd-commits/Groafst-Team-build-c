"use client";

import { useEffect, useState } from "react";
import DataTable from "./DataTable";

export default function DocumentsTable({ canManage = false }) {
  const [rows, setRows] = useState([]);
  const [docs, setDocs] = useState([]);

  const load = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/documents`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return;
    const data = await response.json();
    setDocs(data);

    const mapped = data.map((doc) => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE}/${process.env.NEXT_PUBLIC_UPLOAD_DIR || "uploads"}/${doc.filename}`;
      const preview = doc.mimeType.startsWith("image/") ? (
        <img src={url} alt={doc.originalName} className="h-10 w-10 object-cover rounded" />
      ) : doc.mimeType === "application/pdf" ? (
        <iframe src={url} className="h-12 w-20 rounded border border-[var(--border)]" />
      ) : (
        <span className="text-xs text-[var(--muted)]">No preview</span>
      );

      return [
        preview,
        doc.originalName,
        doc.mimeType,
        `${Math.round(doc.size / 1024)} KB`,
        <a key={doc._id} href={url} className="text-brand-500" target="_blank" rel="noreferrer">
          Download
        </a>
      ];
    });

    setRows(mapped);
  };

  useEffect(() => {
    load();
  }, []);

  const handleRename = async (doc) => {
    const next = prompt("Rename document", doc.originalName);
    if (!next || next === doc.originalName) return;

    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/documents/${doc._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ originalName: next })
    });

    if (response.ok) load();
  };

  const handleDelete = async (doc) => {
    if (!confirm(`Delete ${doc.originalName}?`)) return;

    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/documents/${doc._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.ok) load();
  };

  const columns = ["Preview", "File", "Type", "Size", ""];

  const actionRows = canManage
    ? docs.map((doc) => (
        <div key={doc._id} className="flex items-center gap-3">
          <button
            onClick={() => handleRename(doc)}
            className="text-xs text-brand-500"
          >
            Rename
          </button>
          <button
            onClick={() => handleDelete(doc)}
            className="text-xs text-red-500"
          >
            Delete
          </button>
        </div>
      ))
    : null;

  const rowsWithActions = canManage
    ? rows.map((row, idx) => [...row, actionRows[idx]])
    : rows;

  const columnsWithActions = canManage ? [...columns, "Actions"] : columns;

  return (
    <DataTable
      title="Documents"
      columns={columnsWithActions}
      rows={rowsWithActions}
    />
  );
}
