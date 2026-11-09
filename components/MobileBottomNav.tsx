"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, Briefcase, LayoutDashboard, ShieldCheck, UserCircle2 } from "lucide-react";
import { getDefaultDashboard, getTrustedRole, type UserRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

const items = [{ href: "/", label: "Home", icon: BookOpen }, { href: "/explore", label: "Skills", icon: BookOpen }, { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }, { href: "/opportunities", label: "Jobs", icon: Briefcase }, { href: "/profile", label: "Profile", icon: UserCircle2 }];
export function MobileBottomNav() {
  const [role, setRole] = useState<UserRole>("learner");
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    let client;
    try { client = createClient(); } catch { return; }
    client.auth.getUser().then(({ data }) => { setSignedIn(Boolean(data.user)); if (data.user) setRole(getTrustedRole(data.user.app_metadata)); });
    const { data: listener } = client.auth.onAuthStateChange((_event, session) => { setSignedIn(Boolean(session?.user)); setRole(getTrustedRole(session?.user.app_metadata)); });
    return () => listener.subscription.unsubscribe();
  }, []);
  return <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md md:hidden"><div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-2 py-2">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href === "/dashboard" ? getDefaultDashboard(role) : href} className="flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] text-slate-400 hover:bg-slate-900 hover:text-cyan-300"><Icon size={18} /><span>{label}</span></Link>)}{!signedIn ? <Link href="/login" className="flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] text-slate-400 hover:bg-slate-900 hover:text-cyan-300"><ShieldCheck size={18} /><span>Login</span></Link> : null}</div></nav>;
}
