"use client";

import Link from "next/link";
import { Moon, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { getDefaultDashboard, getTrustedRole, type UserRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

type NavUser = { name: string; role: UserRole };
const navItems = [{ href: "/", label: "Home" }, { href: "/explore", label: "Explore" }, { href: "/dashboard", label: "Dashboard" }, { href: "/opportunities", label: "Opportunities" }, { href: "/profile", label: "Profile" }];

export function Navbar() {
  const { toggleTheme } = useTheme();
  const [user, setUser] = useState<NavUser | null>(null);

  useEffect(() => {
    let mounted = true;
    let supabase;
    try { supabase = createClient(); } catch { return; }
    supabase.auth.getUser().then(({ data }) => {
      if (mounted && data.user) setUser({ name: data.user.user_metadata?.full_name || data.user.email || "Account", role: getTrustedRole(data.user.app_metadata) });
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ? { name: session.user.user_metadata?.full_name || session.user.email || "Account", role: getTrustedRole(session.user.app_metadata) } : null);
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  async function logout() {
    try { await createClient().auth.signOut(); } finally { setUser(null); window.location.assign("/"); }
  }

  const dashboard = getDefaultDashboard(user?.role);
  return <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
    <Link href="/" className="text-xl font-black tracking-tight text-white md:text-2xl">SkillBridge</Link>
    <nav className="hidden items-center gap-6 md:flex">{navItems.map((item) => <Link key={item.href} href={item.href === "/dashboard" ? dashboard : item.href} className="text-sm text-slate-300 transition hover:text-white">{item.label}</Link>)}{user?.role === "provider" || user?.role === "admin" ? <Link href="/provider" className="text-sm text-slate-300 hover:text-white">Provider</Link> : null}{user?.role === "admin" ? <Link href="/admin" className="text-sm text-slate-300 hover:text-white">Admin</Link> : null}</nav>
    <div className="flex items-center gap-3"><button onClick={toggleTheme} className="rounded-full border border-slate-700 p-2 text-slate-300" aria-label="Toggle theme"><Moon size={16} /></button>{user ? <><span className="hidden items-center gap-2 text-xs text-cyan-200 md:flex"><UserRound size={14} />{user.name.split(" ")[0]}</span><button onClick={logout} className="rounded-full border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200">Logout</button></> : <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"><ShieldCheck size={14} />Login</Link>}</div>
  </div></header>;
}
