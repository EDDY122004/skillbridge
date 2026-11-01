import Link from "next/link";
import { TrendingUp, Briefcase, Star } from "lucide-react";

const stats = [
  { label: "Skills tracked", value: "18" },
  { label: "Completed", value: "6" },
  { label: "Matches", value: "12" },
  { label: "Avg. score", value: "86%" },
];

const learningProgress = [
  { skill: "Web Development", progress: 78, status: "Strong progress" },
  { skill: "Database Management", progress: 64, status: "Improving" },
  { skill: "Cybersecurity", progress: 42, status: "Needs focus" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Welcome back, Edimond</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
            <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="text-cyan-300" size={18} />
            <h2 className="text-xl font-semibold text-white">Learning progress</h2>
          </div>

          <div className="space-y-5">
            {learningProgress.map((item) => (
              <div key={item.skill}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{item.skill}</span>
                  <span className="text-cyan-300">{item.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                  <div className="h-full rounded-full bg-cyan-500" style={{ width: `${item.progress}%` }} />
                </div>
                <div className="mt-2 text-xs text-slate-400">{item.status}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center gap-2">
            <Briefcase className="text-cyan-300" size={18} />
            <h2 className="text-xl font-semibold text-white">Recommended opportunities</h2>
          </div>

          <div className="space-y-4">
            {[
              { title: "Frontend Developer Intern", match: "92% match", type: "Internship" },
              { title: "UI/UX Design Assistant", match: "88% match", type: "Part-time" },
              { title: "Junior Web Developer", match: "81% match", type: "Job" },
            ].map((opportunity) => (
              <div key={opportunity.title} className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{opportunity.title}</h3>
                    <p className="text-sm text-slate-400">{opportunity.type}</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">{opportunity.match}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="text-cyan-300" size={18} />
            <h2 className="text-xl font-semibold text-white">Skill focus</h2>
          </div>
          <Link href="/opportunities" className="text-sm text-cyan-300">See all opportunities</Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            "JavaScript Fundamentals",
            "Responsive Design",
            "Database Queries",
          ].map((skill) => (
            <div key={skill} className="rounded-2xl bg-slate-950 p-4 text-slate-300">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
