"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Shell from "../components/Shell";
import { BarChart } from "../components/Charts";
import DataTable from "../components/DataTable";
import NotificationsPanel from "../components/NotificationsPanel";
import DocumentsTable from "../components/DocumentsTable";

const tasks = [
  ["Landing page prototype", "In progress", "Feb 13"],
  ["Brand style guide", "Pending review", "Feb 16"],
  ["Social media pack", "Completed", "Feb 9"]
];

export default function MemberDashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <Shell role="Team Member">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Your Workspace</h1>
          <p className="text-[var(--muted)]">Track your assignments and stay aligned.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card p-5">
            <p className="text-sm text-[var(--muted)]">Assigned Tasks</p>
            <p className="text-2xl font-semibold mt-2">8</p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-[var(--muted)]">Deadlines This Week</p>
            <p className="text-2xl font-semibold mt-2">3</p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-[var(--muted)]">Attendance</p>
            <p className="text-2xl font-semibold mt-2">96%</p>
          </div>
        </div>
        <BarChart
          title="Weekly Focus Time"
          data={[
            { label: "M", value: 5 },
            { label: "T", value: 6 },
            { label: "W", value: 4 },
            { label: "T", value: 7 },
            { label: "F", value: 6 },
            { label: "S", value: 3 },
            { label: "S", value: 2 }
          ]}
        />
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
          <DataTable
            title="Assigned Tasks"
            columns={["Task", "Status", "Deadline"]}
            rows={tasks}
            actions={
              <input
                placeholder="Filter tasks"
                className="rounded-full border border-[var(--border)] px-3 py-1 text-sm"
              />
            }
          />
          <NotificationsPanel />
        </div>
        <DocumentsTable />
      </div>
    </Shell>
  );
}
