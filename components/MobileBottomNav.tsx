import Link from "next/link";
import { BookOpen, Briefcase, LayoutDashboard, UserCircle2 } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: BookOpen },
  { href: "/explore", label: "Skills", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/opportunities", label: "Jobs", icon: Briefcase },
  { href: "/profile", label: "Profile", icon: UserCircle2 },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-2 px-2 py-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[10px] text-slate-400 transition hover:bg-slate-900 hover:text-cyan-300"
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
