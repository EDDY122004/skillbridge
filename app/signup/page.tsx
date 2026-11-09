"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDefaultDashboard } from "@/lib/auth";
import { getUsers, saveAuthSession } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@skillbridge.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const users = getUsers();
    const user = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    );

    if (!user) {
      setError("Invalid email or password. Try the demo account or create a new one.");
      return;
    }

    saveAuthSession({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    router.push(getDefaultDashboard(user.role));
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to continue your learning journey</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Sign In
          </button>
        </form>

        <div className="mt-5 space-y-2 text-center text-xs text-slate-400">
          <p>Demo learner: demo@skillbridge.com / password123</p>
          <p>Demo provider: provider@skillbridge.com / provider123</p>
          <p>Demo admin: admin@skillbridge.com / admin123</p>
        </div>

        <p className="mt-5 text-center text-sm text-slate-400">
          Don&apos;t have an account? <Link href="/signup" className="font-medium text-cyan-300">Create one</Link>
        </p>
      </div>
    </div>
  );
}
