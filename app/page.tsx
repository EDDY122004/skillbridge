import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, TrendingUp } from "lucide-react";
import { featuredSkills, mentors } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              Learn. Grow. Get matched.
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              Build skills that lead to real opportunities.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              SkillBridge helps you explore practical skills, learn the concepts behind them,
              track your progress, and discover opportunities that match your abilities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore Skills
              </Link>
              <Link
                href="/opportunities"
                className="inline-flex items-center rounded-full border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-slate-500"
              >
                Find Opportunities
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: "12k+", label: "Learners" },
                { value: "480+", label: "Mentors" },
                { value: "94%", label: "Progress" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Your learning path</p>
                <h2 className="text-2xl font-bold text-white">Frontend Mastery</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                72% complete
              </span>
            </div>

            <div className="space-y-4">
              {featuredSkills.slice(0, 3).map((skill) => (
                <div key={skill.title} className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{skill.title}</h3>
                      <p className="text-sm text-slate-400">{skill.level}</p>
                    </div>
                    <div className="text-sm font-medium text-cyan-300">{skill.lessons} lessons</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-cyan-500 p-4 text-slate-950">
              <p className="text-sm font-medium">Mentor spotlight</p>
              <h3 className="mt-2 text-xl font-bold">Aisha K.</h3>
              <p className="text-sm">UI/UX Design Mentor</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Popular Skills</h2>
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm text-cyan-300">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {featuredSkills.map((skill) => (
            <div key={skill.title} className="rounded-3xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-500/40 hover:bg-slate-800/90">
              <div className="mb-4 h-28 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-indigo-500/30" />
              <h3 className="text-xl font-semibold text-white">{skill.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{skill.description}</p>
              <Link href="/explore" className="mt-5 inline-block text-sm font-medium text-cyan-300">
                Explore track →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Why SkillBridge</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Skill discovery", text: "Master key concepts and build practical understanding step by step." },
            { icon: TrendingUp, title: "Progress tracking", text: "Measure your learning journey and identify what to improve next." },
            { icon: Briefcase, title: "Opportunity matching", text: "Find jobs, internships, and projects aligned with your skills and interests." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 inline-flex rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="mb-8 text-3xl font-bold">Top Mentors</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {mentors.map((mentor) => (
            <div key={mentor.name} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-lg font-bold text-slate-950">
                {mentor.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-white">{mentor.name}</h3>
              <p className="text-slate-400">{mentor.expertise}</p>
              <p className="mt-3 text-cyan-300">★ {mentor.rating}</p>
              <button className="mt-5 w-full rounded-full bg-white px-4 py-2 font-medium text-slate-950">
                Book session
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
