"use client";

import Link from "next/link";
import { Moon, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { getDefaultDashboard, type UserRole } from "@/lib/auth";
import { clearAuthSession, getAuthSession } from "@/lib/storage";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const [session, setSession] = useState<ReturnType<typeof getAuthSession>>(null);

  useEffect(() => {
    setSession(getAuthSession());
  }, []);

  const role = (session?.role as UserRole | undefined) ?? "learner";

  const handleLogout = () => {
    clearAuthSession();
    setSession(null);
    window.location.href = "/";
  };

  const dashboardHref = getDefaultDashboard(role);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-black tracking-tight text-white md:text-2xl">
          SkillBridge
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            if (item.href === "/dashboard") {
              return (
                <Link
                  key={item.href}
                  href={dashboardHref}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            );
          })}

          {role === "provider" || role === "admin" ? (
            <Link href="/provider" className="text-sm text-slate-300 transition hover:text-white">
              Provider
            </Link>
          ) : null}

          {role === "admin" ? (
            <Link href="/admin" className="text-sm text-slate-300 transition hover:text-white">
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-slate-700 p-2 text-slate-300"
            aria-label="Toggle theme"
          >
            <Moon size={16} />
          </button>

          {session ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1.5 md:flex">
                <UserRound className="text-cyan-300" size={14} />
                <span className="text-xs font-medium text-cyan-200">{session.name.split(" ")[0]}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              <ShieldCheck size={14} />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
