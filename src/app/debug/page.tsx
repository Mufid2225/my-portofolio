"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, RefreshCw } from "lucide-react";

type Log = {
  type: string;
  message: string;
  time: string;
};

export default function DebugPage() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("debug_logs") || "[]");
      setLogs(stored);
    } catch {}
  }, []);

  const clear = () => {
    localStorage.removeItem("debug_logs");
    setLogs([]);
  };

  const refresh = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("debug_logs") || "[]");
      setLogs(stored);
    } catch {}
  };

  const colorMap: Record<string, string> = {
    error: "text-red-400 border-red-500/20 bg-red-500/5",
    warn: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
    info: "text-blue-400 border-blue-500/20 bg-blue-500/5",
    log: "text-muted-foreground border-border/40 bg-secondary/50",
  };

  return (
    <div className="min-h-screen bg-[#030303] px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            <span className="text-emerald-400">Debug</span> Panel
          </h1>
          <div className="flex gap-2">
            <button onClick={refresh} className="rounded-lg border border-border/40 p-2 text-muted-foreground hover:text-foreground">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button onClick={clear} className="rounded-lg border border-border/40 p-2 text-muted-foreground hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Halaman ini menyimpan error yang terjadi selama sesi berlangsung.
        </p>

        {logs.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Belum ada error tercatat.
          </p>
        ) : (
          <div className="mt-6 space-y-2">
            {logs.toReversed().map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg border p-3 font-mono text-xs ${colorMap[log.type] || colorMap.log}`}
              >
                <span className="text-[10px] opacity-50">{log.time}</span>
                <p className="mt-1 break-all">{log.message}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
