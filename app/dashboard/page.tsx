import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { skillCatalog } from "@/lib/data";

export default function ExplorePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Explore</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Browse skills and learning tracks</h1>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-300 md:w-[360px]">
            <Search size={18} className="text-slate-500" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              placeholder="Search skill, domain or concept"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillCatalog.map((skill) => (
          <div key={skill.slug} className="rounded-3xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-500/40 hover:bg-slate-800/90">
            <div className="mb-4 h-28 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-indigo-500/30" />
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">{skill.title}</h2>
              <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">{skill.level}</span>
            </div>
            <p className="text-sm text-slate-400">{skill.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {skill.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">
                  {tool}
                </span>
              ))}
            </div>

            <Link
              href={`/skills/${skill.slug}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300"
            >
              View track <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
