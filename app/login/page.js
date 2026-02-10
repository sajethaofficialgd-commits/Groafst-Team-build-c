"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || "Login failed");
      }

      const payload = await response.json();
      localStorage.setItem("token", payload.token);
      localStorage.setItem("role", payload.role);
      localStorage.setItem("name", payload.name || "");

      router.push(payload.role === "admin" ? "/admin" : "/member");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="p-10 flex flex-col justify-between">
        <div className="text-2xl font-semibold">GROFAST DIGITAL</div>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold">Welcome back.</h1>
          <p className="text-[var(--muted)]">
            Securely access your dashboard, manage tasks, and track performance.
          </p>
          <div className="flex gap-2">
            <span className="tag bg-blue-100 text-blue-700">JWT ready</span>
            <span className="tag bg-emerald-100 text-emerald-700">SaaS UI</span>
          </div>
        </div>
        <p className="text-sm text-[var(--muted)]">Need access? Contact your admin.</p>
      </div>
      <div className="p-10 flex items-center">
        <form
          onSubmit={submit}
          className="card w-full p-8 space-y-5"
        >
          <h2 className="text-2xl font-semibold">Sign in</h2>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <div className="space-y-2">
            <label className="text-sm">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-2"
              placeholder="name@grofastdigital.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-2"
              placeholder="••••••••"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-500 text-white py-2"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
