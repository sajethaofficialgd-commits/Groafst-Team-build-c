"use client";

export default function ExportButtons() {
  const exportReport = async (format) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/reports/export?format=${format}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      return alert(payload.message || "Export failed");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const ext = format === "excel" ? "xlsx" : format;
    link.download = `report.${ext}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => exportReport("csv")}
        className="px-3 py-1 rounded-full border border-[var(--border)] text-sm"
      >
        Export CSV
      </button>
      <button
        onClick={() => exportReport("excel")}
        className="px-3 py-1 rounded-full border border-[var(--border)] text-sm"
      >
        Export Excel
      </button>
      <button
        onClick={() => exportReport("pdf")}
        className="px-3 py-1 rounded-full border border-[var(--border)] text-sm"
      >
        Export PDF
      </button>
    </div>
  );
}
