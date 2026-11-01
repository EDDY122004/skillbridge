"use client";

import { adminOverview } from "@/lib/data";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-24">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-bold text-white">System overview</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Users", value: adminOverview.users },
          { label: "Skills", value: adminOverview.skills },
          { label: "Opportunities", value: adminOverview.opportunities },
          { label: "Mentors", value: adminOverview.activeMentors },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-3xl font-bold text-cyan-400">{item.value}</div>
            <div className="mt-1 text-sm text-slate-400">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-5 text-xl font-semibold text-white">Management modules</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Skills management",
            "Learning resources",
            "Opportunity moderation",
            "User accounts",
            "Progress tracking",
            "System reports",
          ].map((module) => (
            <div key={module} className="rounded-2xl border border-slate-700 bg-slate-950 p-4 text-slate-300">
              {module}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
