"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Trash2, RefreshCw, Terminal } from "lucide-react";

type Log = {
  type: string;
  message: string;
  time: string;
};

const DEBUG_STORAGE_EVENT = "portfolio_debug_logs_change";
let cachedRaw = "";
let cachedLogs: Log[] = [];

function subscribeLogs(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(DEBUG_STORAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(DEBUG_STORAGE_EVENT, callback);
  };
}

function getLogsSnapshot(): Log[] {
  try {
    const raw = localStorage.getItem("debug_logs") || "[]";
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      const parsed = JSON.parse(raw);
      cachedLogs = Array.isArray(parsed) ? parsed : [];
    }
    return cachedLogs;
  } catch {
    return [];
  }
}

const emptyLogs: Log[] = [];
function getServerLogsSnapshot(): Log[] {
  return emptyLogs;
}

const colorMap: Record<string, string> = {
  error: "text-red-400 border-red-500/20 bg-red-500/5",
  warn: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
  info: "text-zinc-200 border-white/15 bg-white/[0.03]",
  log: "text-zinc-400 border-white/10 bg-zinc-900/60",
};

export default function DebugPage() {
  const logs = useSyncExternalStore(subscribeLogs, getLogsSnapshot, getServerLogsSnapshot);

  const clear = () => {
    try {
      localStorage.removeItem("debug_logs");
      cachedRaw = "";
      cachedLogs = [];
    } catch {
      // ignore storage error
    }
    window.dispatchEvent(new Event(DEBUG_STORAGE_EVENT));
  };

  const refresh = () => {
    cachedRaw = "";
    window.dispatchEvent(new Event(DEBUG_STORAGE_EVENT));
  };

  return (
    <div className="min-h-screen bg-[#030303] px-4 py-24 font-mono">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 shadow-[0_12px_45px_rgba(0,0,0,0.75)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 select-none">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <Terminal className="ml-2 h-3.5 w-3.5" />
            <span>debug://runtime/logs</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={refresh}
              aria-label="Refresh logs"
              className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-zinc-400 transition-colors hover:border-white/30 hover:text-white cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={clear}
              aria-label="Clear logs"
              className="rounded-lg border border-white/10 bg-white/[0.03] p-1.5 text-zinc-400 transition-colors hover:border-red-500/40 hover:text-red-400 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-xl font-bold text-foreground">
            Debug <span className="text-zinc-400">Panel</span>
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            {"// Runtime error & diagnostic log storage for current browser session."}
          </p>

          {logs.length === 0 ? (
            <div className="mt-8 rounded-xl border border-white/10 bg-zinc-900/40 p-8 text-center text-xs text-zinc-500">
              [EMPTY] Belum ada error tercatat.
            </div>
          ) : (
            <div className="mt-6 space-y-2">
              {logs.toReversed().map((log, i) => (
                <motion.div
                  key={`${log.time}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-lg border p-3 text-xs ${colorMap[log.type] || colorMap.log}`}
                >
                  <span className="text-[10px] opacity-50">{log.time}</span>
                  <p className="mt-1 break-all">{log.message}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
