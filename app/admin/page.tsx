"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthSession } from "@/lib/storage";

export default function ProviderPage() {
  const router = useRouter();

  useEffect(() => {
    const session = getAuthSession();
    if (!session || (session.role !== "provider" && session.role !== "admin")) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 pb-24">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Provider Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Manage posted opportunities</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Open roles", value: "18" },
          { label: "Applications", value: "246" },
          { label: "Matches", value: "96%" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
            <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recently posted</h2>
          <Link href="/admin" className="text-sm text-cyan-300">Admin overview</Link>
        </div>

        <div className="space-y-4">
          {[
            { title: "Frontend Developer Intern", status: "Active" },
            { title: "UI/UX Assistant", status: "Reviewing" },
            { title: "Data Analyst Trainee", status: "Active" },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950 p-4">
              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400">Posted 3 days ago</p>
              </div>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
