"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { getDefaultDashboard } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(searchParams.get("error") === "auth-not-configured" ? "Authentication is not configured yet. Add the Supabase environment variables and schema before signing in." : "");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError || !data.user) throw new Error(authError?.message ?? "Sign-in failed.");
      const role = data.user.app_metadata?.role;
      router.replace(getDefaultDashboard(role));
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
        <div className="mb-8 text-center"><h1 className="text-3xl font-bold text-white">Welcome back</h1><p className="mt-2 text-sm text-slate-400">Sign in to continue your learning journey</p></div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div><label htmlFor="email" className="mb-2 block text-sm text-slate-300">Email</label><input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500" /></div>
          <div><label htmlFor="password" className="mb-2 block text-sm text-slate-300">Password</label><input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500" /></div>
          {error ? <p role="alert" className="text-sm text-red-400">{error}</p> : null}
          <button disabled={busy} type="submit" className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60">{busy ? "Signing in…" : "Sign In"}</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-400">Don&apos;t have an account? <Link href="/signup" className="font-medium text-cyan-300">Create one</Link></p>
      </div>
    </div>
  );
}
