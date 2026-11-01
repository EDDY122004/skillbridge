import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, TrendingUp } from "lucide-react";
import { featuredSkills, mentors } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white">
      <section className="mx-auto max-w-6xl px-4 py-8 md:py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 md:text-sm">
              Learn. Grow. Get matched.
            </span>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
              Build skills that lead to real opportunities.
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-300 md:text-lg">
              SkillBridge helps students, job seekers, and professionals discover practical skills,
              learn the concepts behind them, track progress, and find opportunities that fit their strengths.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
              <Link
                href="/explore"
                className="inline-flex items-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 md:text-base"
              >
                Explore Skills
              </Link>
              <Link
                href="/opportunities"
                className="inline-flex items-center rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-500 md:text-base"
              >
                View Jobs
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { value: "12k+", label: "Users" },
                { value: "480+", label: "Mentors" },
                { value: "94%", label: "Progress" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-3 text-center">
                  <div className="text-xl font-bold text-cyan-400 md:text-2xl">{stat.value}</div>
                  <div className="text-[10px] text-slate-400 md:text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-soft md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400 md:text-sm">Your learning path</p>
                <h2 className="text-xl font-bold md:text-2xl">Frontend Mastery</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300 md:text-sm">
                72% complete
              </span>
            </div>

            <div className="space-y-3">
              {featuredSkills.slice(0, 3).map((skill) => (
                <div key={skill.title} className="rounded-2xl border border-slate-700 bg-slate-800 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{skill.title}</h3>
                      <p className="text-xs text-slate-400">{skill.level}</p>
                    </div>
                    <div className="text-xs text-cyan-300">{skill.lessons} lessons</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-cyan-500 p-4 text-slate-950">
              <p className="text-xs font-medium md:text-sm">Mentor spotlight</p>
              <h3 className="mt-2 text-lg font-bold">Aisha K.</h3>
              <p className="text-sm">UI/UX Design Mentor</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Popular Skills</h2>
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm text-cyan-300">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredSkills.map((skill) => (
            <div key={skill.title} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-indigo-500/30" />
              <h3 className="text-lg font-semibold text-white">{skill.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{skill.description}</p>
              <Link href="/explore" className="mt-4 inline-block text-sm font-medium text-cyan-300">
                Explore track →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Why SkillBridge</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Skill discovery", text: "Learn step by step and understand what each skill truly involves." },
            { icon: TrendingUp, title: "Progress tracking", text: "See your growth and identify where you need more practice." },
            { icon: Briefcase, title: "Opportunity matching", text: "Find internships, jobs, and projects based on your strengths." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 inline-flex rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                <Icon size={18} />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Top Mentors</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {mentors.map((mentor) => (
            <div key={mentor.name} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-base font-bold text-slate-950">
                {mentor.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-white">{mentor.name}</h3>
              <p className="text-sm text-slate-400">{mentor.expertise}</p>
              <p className="mt-3 text-cyan-300">★ {mentor.rating}</p>
              <button className="mt-5 w-full rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950">
                Book session
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
