"use client";

export function BarChart({ title, data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-xs text-[var(--muted)]">Last 7 days</span>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-3 items-end h-40">
        {data.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div
              className="w-6 rounded-full bg-brand-500"
              style={{ height: `${Math.round((item.value / max) * 120) + 12}px` }}
            />
            <span className="text-xs text-[var(--muted)]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DonutChart({ title, percent }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="card p-6 flex flex-col gap-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center gap-6">
        <svg width="120" height="120" className="-rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#3b6dff"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div>
          <p className="text-3xl font-semibold">{percent}%</p>
          <p className="text-sm text-[var(--muted)]">Goal achieved</p>
        </div>
      </div>
    </div>
  );
}
