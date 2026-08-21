"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage("id")}
        className={`relative rounded-full px-2.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
          language === "id"
            ? "text-white font-semibold"
            : "text-zinc-400 hover:text-white"
        }`}
        aria-pressed={language === "id"}
      >
        {language === "id" && (
          <motion.div
            layoutId="active-lang-indicator"
            className="absolute inset-0 rounded-full border border-white/20 bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">ID</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`relative rounded-full px-2.5 py-1 text-xs font-mono font-medium transition-colors cursor-pointer ${
          language === "en"
            ? "text-white font-semibold"
            : "text-zinc-400 hover:text-white"
        }`}
        aria-pressed={language === "en"}
      >
        {language === "en" && (
          <motion.div
            layoutId="active-lang-indicator"
            className="absolute inset-0 rounded-full border border-white/20 bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}

export default LanguageToggle;
