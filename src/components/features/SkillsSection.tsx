"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { techStackItems, type TechStackItem } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

const row1 = techStackItems.filter((item) => item.row === 1);
const row2 = techStackItems.filter((item) => item.row === 2);

function TechChip({ tech }: { tech: TechStackItem }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/90 px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/40 hover:bg-zinc-800/90 hover:scale-105 hover:shadow-[0_8px_25px_rgba(255,255,255,0.08)] select-none">
      <div className="relative h-6 w-6 shrink-0 md:h-7 md:w-7">
        <Image
          src={tech.src}
          alt={tech.name}
          fill
          sizes="28px"
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="font-mono text-xs md:text-sm font-medium text-zinc-300 transition-colors group-hover:text-white whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

export default function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section className="relative border-t border-border/40 px-4 py-24 overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400 mb-3 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>02 // TECH STACK & TOOLS</span>
          </div>
          <h2 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.skills.title} <span className="text-white">{t.skills.highlight}</span>
          </h2>
          <p className="mt-2 text-zinc-400 font-mono text-sm sm:text-base">
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Dual Infinite Marquee Container */}
        <div className="relative w-full overflow-hidden py-2 space-y-4">
          {/* Left / Right Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-background via-background/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-background via-background/80 to-transparent z-20" />

          {/* Row 1: Flowing Left (Pauses only when Row 1 is hovered) */}
          <div className="marquee-row overflow-hidden py-1">
            <div className="animate-marquee-left flex gap-4 items-center">
              {row1.concat(row1).map((tech, idx) => (
                <TechChip key={`row1-${tech.name}-${idx}`} tech={tech} />
              ))}
            </div>
          </div>

          {/* Row 2: Flowing Right (Pauses only when Row 2 is hovered) */}
          <div className="marquee-row overflow-hidden py-1">
            <div className="animate-marquee-right flex gap-4 items-center">
              {row2.concat(row2).map((tech, idx) => (
                <TechChip key={`row2-${tech.name}-${idx}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
