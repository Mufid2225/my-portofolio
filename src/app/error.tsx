"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center"
      >
        <AlertTriangle className="mx-auto h-16 w-16 text-red-400" />
        <h1 className="mt-6 text-3xl font-bold text-foreground">
          Oops, <span className="text-white">Error</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Ada sesuatu yang salah. Coba refresh halaman.
        </p>
        <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-left font-mono text-xs text-red-300">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Coba Lagi
        </button>
      </motion.div>
    </div>
  );
}

