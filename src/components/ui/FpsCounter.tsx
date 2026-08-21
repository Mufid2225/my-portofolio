"use client";

import React, { useEffect, useState, useRef } from "react";

// Individual rolling digit column for smooth odometer transition
function OdometerDigit({ digit }: { digit: string }) {
  const num = parseInt(digit, 10);
  const isNumber = !isNaN(num);

  if (!isNumber) {
    return <span className="inline-block">{digit}</span>;
  }

  return (
    <span className="relative inline-block h-[1.15em] w-[0.62em] overflow-hidden align-baseline">
      <span
        className="absolute left-0 top-0 flex flex-col font-bold tabular-nums transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translateY(-${num * 10}%)`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="flex h-[1.15em] items-center justify-center">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function FpsCounter() {
  const [fps, setFps] = useState<number>(60);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;

    const loop = (now: number) => {
      frames++;
      const delta = now - lastTime;
      // Stable refresh interval
      if (delta >= 300) {
        const calculatedFps = Math.min(240, Math.round((frames * 1000) / delta));
        setFps(calculatedFps);
        frames = 0;
        lastTime = now;
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, []);

  const isOptimal = fps >= 50;
  const isWarning = fps >= 30 && fps < 50;

  const fpsStr = String(fps);

  return (
    <div
      title="Aerospace Viewfinder Telemetry — Live FPS"
      className={`group relative flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] sm:text-[11px] select-none transition-all duration-300 ${
        isOptimal
          ? "text-zinc-200"
          : isWarning
          ? "text-yellow-300"
          : "text-red-400"
      }`}
    >
      {/* 4 Micro Tactical Viewfinder Corner Brackets */}
      <span className="pointer-events-none absolute -top-0.5 -left-0.5 h-1.5 w-1.5 border-t border-l border-white/40 transition-all duration-300 group-hover:-top-1 group-hover:-left-1 group-hover:border-white group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
      <span className="pointer-events-none absolute -top-0.5 -right-0.5 h-1.5 w-1.5 border-t border-r border-white/40 transition-all duration-300 group-hover:-top-1 group-hover:-right-1 group-hover:border-white group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
      <span className="pointer-events-none absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 border-b border-l border-white/40 transition-all duration-300 group-hover:-bottom-1 group-hover:-left-1 group-hover:border-white group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
      <span className="pointer-events-none absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 border-b border-r border-white/40 transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1 group-hover:border-white group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]" />

      {/* Background container */}
      <div className="absolute inset-0 rounded bg-white/[0.03] border border-white/10 transition-colors duration-300 group-hover:border-white/25 group-hover:bg-white/[0.06]" />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-1.5 font-mono">
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
            isOptimal
              ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
              : isWarning
              ? "bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)] animate-pulse"
              : "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)] animate-ping"
          }`}
        />

        {/* Rolling Odometer Number Display */}
        <div className="flex items-center tracking-wider">
          {fpsStr.split("").map((digit, i) => (
            <OdometerDigit key={i} digit={digit} />
          ))}
          <span className="ml-1 text-[9px] sm:text-[10px] text-zinc-400 font-normal">FPS</span>
        </div>
      </div>
    </div>
  );
}
