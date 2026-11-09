"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MapPin, UserCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Profile = { name: string; headline: string; email: string; location: string; bio: string; skills: string[] };
const initialProfile: Profile = { name: "", headline: "", email: "", location: "", bio: "", skills: [] };
const inputClass = "w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200 outline-none focus:border-cyan-500";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) { router.replace("/login"); return; }
        setUserId(user.id);
        const { data, error: queryError } = await supabase.from("profiles").select("full_name,headline,location,bio,skills").eq("id", user.id).maybeSingle();
        if (queryError) throw queryError;
        if (!active) return;
        setProfile({ name: data?.full_name ?? user.user_metadata?.full_name ?? "", headline: data?.headline ?? "", email: user.email ?? "", location: data?.location ?? "", bio: data?.bio ?? "", skills: data?.skills ?? [] });
      } catch (caught) { if (active) setError(caught instanceof Error ? caught.message : "Could not load profile. Apply the Supabase schema first."); }
      finally { if (active) setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, [router]);

  function update<K extends keyof Profile>(field: K, value: Profile[K]) { setProfile((current) => ({ ...current, [field]: value })); }
  async function save() {
    setSaving(true); setError(""); setNotice("");
    try {
      const supabase = createClient();
      const { error: saveError } = await supabase.from("profiles").upsert({ id: userId, full_name: profile.name.trim(), headline: profile.headline.trim(), location: profile.location.trim(), bio: profile.bio.trim(), skills: profile.skills }, { onConflict: "id" });
      if (saveError) throw saveError;
      setNotice("Profile saved.");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Could not save your profile."); }
    finally { setSaving(false); }
  }
  if (loading) return <div className="mx-auto max-w-4xl px-4 py-12 text-slate-300">Loading profile…</div>;
  return <div className="mx-auto max-w-4xl px-4 py-12 pb-24"><div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
    <div className="flex flex-col gap-6 md:flex-row md:items-center"><div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-2xl font-bold text-slate-950">{profile.name.charAt(0) || "?"}</div><div><h1 className="text-3xl font-bold text-white">{profile.name || "Your profile"}</h1><p className="mt-2 text-cyan-300">{profile.headline}</p></div></div>
    <div className="mt-8 grid gap-6 md:grid-cols-2"><section className="rounded-2xl border border-slate-800 bg-slate-950 p-5"><div className="mb-4 flex items-center gap-2 text-cyan-300"><UserCircle2 size={18}/><h2 className="text-lg font-semibold">Profile overview</h2></div><label className="mb-2 block text-sm text-slate-300" htmlFor="bio">About you</label><textarea id="bio" value={profile.bio} onChange={(e) => update("bio", e.target.value)} className="h-28 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"/><label className="mb-2 mt-4 block text-sm text-slate-300" htmlFor="headline">Headline</label><input id="headline" value={profile.headline} onChange={(e) => update("headline", e.target.value)} className={inputClass}/></section>
    <section className="rounded-2xl border border-slate-800 bg-slate-950 p-5"><div className="mb-4 flex items-center gap-2 text-cyan-300"><Mail size={18}/><h2 className="text-lg font-semibold">Contact details</h2></div><label htmlFor="profileEmail" className="mb-2 block text-sm text-slate-300">Account email</label><input id="profileEmail" disabled value={profile.email} className={`${inputClass} opacity-60`}/><label htmlFor="location" className="mb-2 mt-3 block text-sm text-slate-300">Location</label><div className="flex items-center gap-2"><MapPin size={16}/><input id="location" value={profile.location} onChange={(e) => update("location", e.target.value)} className={inputClass}/></div><label htmlFor="name" className="mb-2 mt-3 block text-sm text-slate-300">Full name</label><input id="name" value={profile.name} onChange={(e) => update("name", e.target.value)} className={inputClass}/></section></div>
    <div className="mt-8"><label htmlFor="skills" className="mb-4 block text-xl font-semibold text-white">Core skills <span className="text-sm font-normal text-slate-400">(comma-separated)</span></label><textarea id="skills" value={profile.skills.join(", ")} onChange={(e) => update("skills", e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean))} className="h-24 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none focus:border-cyan-500"/></div>
    {error ? <p role="alert" className="mt-4 text-sm text-red-400">{error}</p> : null}{notice ? <p role="status" className="mt-4 text-sm text-emerald-300">{notice}</p> : null}<div className="mt-8 flex justify-end"><button disabled={saving} onClick={save} className="rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 disabled:opacity-60">{saving ? "Saving…" : "Save profile"}</button></div>
  </div></div>;
}
