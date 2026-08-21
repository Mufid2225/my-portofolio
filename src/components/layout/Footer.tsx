"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        {/* Left: Brand / Copyright & Engine info */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/70" />
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300">
              MUHAMMAD MUFID ARHABURRIZKY
            </p>
          </div>
          <p className="font-mono text-[11px] text-zinc-500">
            &copy; {new Date().getFullYear()} • {t.footer.rights} • NEXT.JS 16
          </p>
        </div>

        {/* Right: System Status & Quick Nav */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-400">
          {/* Live Status Badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-zinc-300">SYSTEMS OPERATIONAL</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">WIB (UTC+7)</span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-4 text-zinc-400">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="transition-colors hover:text-white"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-white"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
