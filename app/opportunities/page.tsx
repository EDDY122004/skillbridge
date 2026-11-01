"use client";

import { useEffect, useState } from "react";
import { Briefcase, Search, Sparkles } from "lucide-react";
import { opportunities as masterOpportunities, userProfile, calculateMatchScore } from "@/lib/data";
import { getStoredProfile } from "@/lib/storage";

export default function OpportunitiesPage() {
  const [profile, setProfile] = useState(userProfile);

  useEffect(() => {
    const saved = getStoredProfile();
    if (saved) {
      setProfile({
        ...userProfile,
        name: saved.name || userProfile.name,
        role: saved.role || userProfile.role,
        skills: saved.skills?.length ? saved.skills : userProfile.skills,
      });
    }
  }, []);

  const matches = masterOpportunities.map((opportunity) => ({
    ...opportunity,
    result: calculateMatchScore(profile.skills, opportunity.requiredSkills),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-24">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Opportunities</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Find roles aligned with your skills</h1>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 md:w-[320px]">
          <Search size={18} className="text-slate-500" />
          <input
            placeholder="Search opportunities"
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        {matches.map((opportunity) => (
          <div key={opportunity.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-cyan-300">
                  <Briefcase size={16} />
                  <span className="text-sm">{opportunity.type}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{opportunity.title}</h2>
                <p className="mt-1 text-slate-400">{opportunity.company}</p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300">
                <Sparkles size={16} />
                {opportunity.result.score}% match
              </div>
            </div>

            <p className="mt-4 text-slate-300">{opportunity.description}</p>

            <div className="mt-5">
              <p className="mb-2 text-sm text-slate-400">Required skills</p>
              <div className="flex flex-wrap gap-2">
                {opportunity.requiredSkills.map((skill) => (
                  <span key={skill} className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {opportunity.result.missing.length > 0 && (
              <div className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="text-sm font-medium text-amber-300">Skill gap to improve</p>
                <p className="mt-2 text-sm text-slate-300">
                  Missing: {opportunity.result.missing.join(", ")}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
