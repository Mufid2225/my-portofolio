"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { captureLog } from "@/lib/debug";
import { useToast } from "@/components/ui/toast";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { toast } = useToast();

  useEffect(() => {
    captureLog("error", error.message);
    toast("error", error.message);
  }, [error, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] px-4 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 shadow-[0_12px_45px_rgba(0,0,0,0.75)]"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-zinc-400 select-none">
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-700" />
          <span className="ml-2">system://runtime/error</span>
        </div>

        <div className="p-6 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
          <h1 className="mt-5 text-2xl font-bold text-foreground">
            Runtime <span className="text-zinc-400">Error</span>
          </h1>
          <p className="mt-2 text-xs text-zinc-400">
            Ada sesuatu yang salah. Coba muat ulang bagian ini.
          </p>
          <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-left text-xs text-red-300 break-words">
            {error.message || "Unexpected application error."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black transition-all hover:bg-zinc-200 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Coba Lagi</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
