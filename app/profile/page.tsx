"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, UserCircle2 } from "lucide-react";
import { getStoredProfile, saveStoredProfile } from "@/lib/storage";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Edimond Morara",
    role: "Frontend Developer",
    email: "edimond@example.com",
    location: "Nairobi, Kenya",
    bio: "I am passionate about building accessible digital systems and turning learning into impact.",
    skills: ["Web Development", "HTML", "CSS", "JavaScript", "SQL", "Responsive Design"],
  });

  useEffect(() => {
    const stored = getStoredProfile();
    if (stored) setProfile(stored);
  }, []);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    saveStoredProfile(profile);
    alert("Profile saved successfully.");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-2xl font-bold text-slate-950">
            {profile.name.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
            <p className="mt-2 text-cyan-300">{profile.role}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <UserCircle2 size={18} />
              <h2 className="text-lg font-semibold">Profile overview</h2>
            </div>
            <textarea
              value={profile.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="h-28 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"
            />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="mb-4 flex items-center gap-2 text-cyan-300">
              <Mail size={18} />
              <h2 className="text-lg font-semibold">Contact details</h2>
            </div>
            <div className="space-y-3 text-slate-300">
              <input
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"
              />
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <input
                  value={profile.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-white">Core skills</h2>
          <textarea
            value={profile.skills.join(", ")}
            onChange={(e) =>
              handleChange("skills", e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean))
            }
            className="h-28 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950"
          >
            Save profile
          </button>
        </div>
      </div>
    </div>
  );
}
