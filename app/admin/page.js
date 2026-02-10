"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Shell from "../components/Shell";
import { BarChart, DonutChart } from "../components/Charts";
import DataTable from "../components/DataTable";
import ExportButtons from "../components/ExportButtons";
import UploadCard from "../components/UploadCard";
import NotificationsPanel from "../components/NotificationsPanel";
import DocumentsTable from "../components/DocumentsTable";

const cards = [
  { title: "Total Members", value: "42" },
  { title: "Active / Inactive", value: "38 / 4" },
  { title: "Ongoing Projects", value: "7" },
  { title: "Attendance Today", value: "91%" }
];

const tasks = [
  { name: "Launch campaign visuals", status: "In review", due: "Feb 14" },
  { name: "Client website sprint", status: "On track", due: "Feb 20" },
  { name: "SEO audit", status: "Delayed", due: "Feb 12" }
];

const teamRows = [
  ["Arun K.", "Designer", "Active", "94%"],
  ["Meera S.", "Developer", "Active", "90%"],
  ["Rahul D.", "Marketer", "Inactive", "62%"],
  ["Fatima H.", "Manager", "Active", "98%"]
];

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <Shell role="Admin">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-semibold">Admin Control Center</h1>
            <p className="text-[var(--muted)]">Overview of team performance and operations.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-full bg-slate-900 text-white">
              Create Task
            </button>
            <ExportButtons />
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {cards.map((item) => (
            <div key={item.title} className="card p-5">
              <p className="text-sm text-[var(--muted)]">{item.title}</p>
              <p className="text-2xl font-semibold mt-2">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <BarChart
            title="Weekly Task Completion"
            data={[
              { label: "M", value: 14 },
              { label: "T", value: 18 },
              { label: "W", value: 22 },
              { label: "T", value: 16 },
              { label: "F", value: 28 },
              { label: "S", value: 12 },
              { label: "S", value: 10 }
            ]}
          />
          <DonutChart title="On-time Delivery" percent={86} />
        </div>
        <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
          <div className="card p-6">
            <h2 className="text-xl font-semibold">Task Progress</h2>
            <div className="mt-4 space-y-4">
              {tasks.map((task) => (
                <div key={task.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{task.name}</p>
                    <p className="text-sm text-[var(--muted)]">Due {task.due}</p>
                  </div>
                  <span className="tag bg-blue-100 text-blue-700">{task.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <UploadCard />
            <NotificationsPanel />
          </div>
        </div>
        <DataTable
          title="Team Members"
          columns={["Name", "Role", "Status", "Performance"]}
          rows={teamRows}
          actions={
            <input
              placeholder="Search members"
              className="rounded-full border border-[var(--border)] px-3 py-1 text-sm"
            />
          }
        />
        <DocumentsTable canManage />
      </div>
    </Shell>
  );
}
