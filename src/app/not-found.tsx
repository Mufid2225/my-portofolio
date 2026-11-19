import Link from "next/link";
import { Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] px-4 font-mono">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 shadow-[0_12px_45px_rgba(0,0,0,0.75)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-zinc-400 select-none">
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <Terminal className="ml-2 h-3.5 w-3.5" />
          <span>route://404/not-found</span>
        </div>

        <div className="p-8 text-center">
          <h1 className="text-6xl font-bold tracking-tight text-white">404</h1>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400">
            {"// Halaman yang kamu cari tidak ditemukan."}
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
