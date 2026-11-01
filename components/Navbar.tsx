import Link from "next/link";
import { Bell, Menu } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-black tracking-tight text-white md:text-2xl">
          SkillBridge
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-700 p-2 text-slate-300 md:hidden">
            <Menu size={16} />
          </button>
          <button className="hidden rounded-full border border-slate-700 p-2 text-slate-300 md:inline-flex">
            <Bell size={16} />
          </button>
          <Link
            href="/login"
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
