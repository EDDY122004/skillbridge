"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDefaultDashboard, type UserRole } from "@/lib/auth";
import { getUsers, saveAuthSession, saveUsers } from "@/lib/storage";

const defaultForm = {
  name: "Student User",
  email: "demo@skillbridge.com",
  password: "password123",
  role: "learner" as UserRole,
};

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState(defaultForm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === "role" ? (value as UserRole) : value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const users = getUsers();
    const duplicate = users.find(
      (item) => item.email.toLowerCase() === form.email.toLowerCase(),
    );

    if (duplicate) {
      alert("An account with this email already exists. Please log in instead.");
      return;
    }

    const user = {
      id: `user-${Date.now()}`,
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    const nextUsers = [...users, user];
    saveUsers(nextUsers);
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
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">Join SkillBridge and start building your future</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Edimond Morara"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
            >
              <option value="learner">Learner</option>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Create Account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Already have an account? <Link href="/login" className="font-medium text-cyan-300">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
