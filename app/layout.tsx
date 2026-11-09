import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = { title: "SkillBridge", description: "A mobile-first skills development and opportunity matching platform", manifest: "/manifest.webmanifest", applicationName: "SkillBridge", appleWebApp: { capable: true, statusBarStyle: "default", title: "SkillBridge" }, icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" } };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#020617" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body className={inter.className}><ThemeProvider><div className="min-h-screen bg-slate-950 text-white"><Navbar /><main>{children}</main><MobileBottomNav /></div></ThemeProvider></body></html>; }
