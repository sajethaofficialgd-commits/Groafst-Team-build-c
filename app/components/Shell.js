"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Shell({ role, children }) {
  const isAdmin = role === "Admin";

  return (
    <div className="min-h-screen grid lg:grid-cols-[260px_1fr]">
      <aside className="bg-[var(--panel)] border-r border-[var(--border)] p-6 flex flex-col gap-8">
        <div>
          <div className="text-lg font-semibold">GROFAST DIGITAL</div>
          <p className="text-sm text-[var(--muted)]">{role} workspace</p>
        </div>
        <nav className="flex flex-col gap-3 text-sm">
          <Link href={isAdmin ? "/admin" : "/member"} className="font-medium">
            Dashboard
          </Link>
          {isAdmin ? <Link href="/admin/documents">Documents</Link> : null}
          <span>Tasks</span>
          <span>Projects</span>
          <span>Attendance</span>
          <span>Announcements</span>
          <span>Reports</span>
          <span>Settings</span>
        </nav>
        <div className="mt-auto flex items-center justify-between">
          <ThemeToggle />
          <Link href="/login" className="text-sm text-[var(--muted)]">
            Logout
          </Link>
        </div>
      </aside>
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}
