import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="text-xl font-semibold tracking-tight">GROFAST DIGITAL</div>
        <Link
          href="/login"
          className="px-5 py-2 rounded-full bg-brand-500 text-white shadow-soft"
        >
          Sign In
        </Link>
      </header>
      <main className="flex-1 grid md:grid-cols-2 gap-10 px-8 pb-16">
        <section className="flex flex-col justify-center gap-6 animate-in">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Team Management built for fast-moving digital agencies.
          </h1>
          <p className="text-lg text-slate-500">
            GROFAST DIGITAL unifies projects, tasks, attendance, and performance in a single
            workspace tailored to both admins and team members.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="tag bg-emerald-100 text-emerald-700">Real-time updates</span>
            <span className="tag bg-blue-100 text-blue-700">Role-based access</span>
            <span className="tag bg-amber-100 text-amber-700">Smart reporting</span>
          </div>
        </section>
        <section className="card p-8 flex flex-col gap-4 animate-in">
          <h2 className="text-2xl font-semibold">Platform at a glance</h2>
          <ul className="space-y-3 text-slate-500">
            <li>Admin control center with analytics and approvals.</li>
            <li>Personalized member dashboards and task tracking.</li>
            <li>Secure authentication and activity logs.</li>
            <li>Scalable API-ready architecture.</li>
          </ul>
          <Link
            href="/login"
            className="mt-4 inline-flex items-center justify-center px-5 py-2 rounded-full bg-slate-900 text-white"
          >
            Enter Workspace
          </Link>
        </section>
      </main>
    </div>
  );
}
