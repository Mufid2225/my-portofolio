"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const wibFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function Footer() {
  const { t } = useLanguage();
  const [wibTime, setWibTime] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => setWibTime(wibFormatter.format(new Date()));
    const initTimer = setTimeout(updateClock, 0);
    const interval = setInterval(updateClock, 1000);
    return () => {
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className="border-t border-white/10 bg-zinc-950/95">
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
            &copy; {new Date().getFullYear()} &bull; {t.footer.rights} &bull; NEXT.JS 16
          </p>
        </div>

        {/* Right: System Status & Quick Nav */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-400">
          {/* Live Status Badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] select-none tabular-nums">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-zinc-300">SYSTEMS OPERATIONAL</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">
              {wibTime ? `${wibTime} WIB` : "WIB (UTC+7)"}
            </span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-4 text-zinc-400">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/projects"
              className="transition-colors hover:text-white"
            >
              {t.nav.projects}
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-white"
            >
              {t.nav.about}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
