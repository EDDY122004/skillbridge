"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestedRole, setRequestedRole] = useState("learner");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setMessage(""); setBusy(true);
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name.trim(), requested_role: requestedRole } },
      });
      if (signUpError) throw signUpError;
      if (data.session) {
        router.replace("/dashboard");
        router.refresh();
      } else {
        setMessage("Account created. Check your email to confirm it, then sign in. Provider access must be approved by an administrator.");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to create your account.");
    } finally { setBusy(false); }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16"><div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
      <div className="mb-8 text-center"><h1 className="text-3xl font-bold text-white">Create your account</h1><p className="mt-2 text-sm text-slate-400">Join SkillBridge and start building your future</p></div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div><label htmlFor="name" className="mb-2 block text-sm text-slate-300">Full name</label><input id="name" required maxLength={100} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500" /></div>
        <div><label htmlFor="email" className="mb-2 block text-sm text-slate-300">Email</label><input id="email" required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500" /></div>
        <div><label htmlFor="password" className="mb-2 block text-sm text-slate-300">Password</label><input id="password" required type="password" minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500" /><p className="mt-1 text-xs text-slate-500">Use at least 8 characters.</p></div>
        <div><label htmlFor="requestedRole" className="mb-2 block text-sm text-slate-300">Account type</label><select id="requestedRole" value={requestedRole} onChange={(event) => setRequestedRole(event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"><option value="learner">Learner</option><option value="provider">Opportunity provider (approval required)</option></select></div>
        {error ? <p role="alert" className="text-sm text-red-400">{error}</p> : null}{message ? <p role="status" className="text-sm text-emerald-300">{message}</p> : null}
        <button disabled={busy} type="submit" className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60">{busy ? "Creating account…" : "Create Account"}</button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-400">Already have an account? <Link href="/login" className="font-medium text-cyan-300">Sign in</Link></p>
    </div></div>
  );
}
