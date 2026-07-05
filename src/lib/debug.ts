"use client";

type LogEntry = {
  type: "error" | "warn" | "info" | "log";
  message: string;
  time: string;
};

export function captureLog(type: LogEntry["type"], message: string) {
  try {
    const stored = JSON.parse(localStorage.getItem("debug_logs") || "[]");
    stored.push({ type, message, time: new Date().toISOString() });
    localStorage.setItem("debug_logs", JSON.stringify(stored.slice(-50)));
  } catch {}
}
