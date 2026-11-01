import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";
import { getSkillBySlug } from "@/lib/data";

export default function SkillPage({ params }: { params: { slug: string } }) {
  const skill = getSkillBySlug(params.slug);

  if (!skill) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/explore" className="mb-6 inline-flex items-center gap-2 text-sm text-cyan-300">
        <ArrowLeft size={16} /> Back to explore
      </Link>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{skill.category}</p>
            <h1 className="mt-2 text-3xl font-bold text-white">{skill.title}</h1>
          </div>

          <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            {skill.progress}% progress
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-slate-300">{skill.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {skill.tools.map((tool) => (
            <span key={tool} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-300">
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <BookOpen size={18} />
              <h2 className="text-xl font-semibold text-white">Core concepts</h2>
            </div>

            <div className="space-y-4">
              {skill.concepts.map((concept) => (
                <div key={concept.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <h3 className="font-semibold text-white">{concept.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{concept.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <TrendingUp size={18} />
              <h2 className="text-xl font-semibold text-white">Learning resources</h2>
            </div>

            <div className="space-y-4">
              {skill.resources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-cyan-500/50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">{resource.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{resource.type}</p>
                    </div>
                    <ExternalLink size={16} className="text-cyan-300" />
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
