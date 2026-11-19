"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/data";
import { Terminal, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Dither from "@/components/ui/Dither";
import { ProjectTerminalCard } from "@/components/features/ProjectCard";

const DITHER_COLOR: [number, number, number] = [0.75, 0.75, 0.75];

export default function ProjectsClient() {
  const { language, t } = useLanguage();

  return (
    <div className="relative min-h-screen pt-6 sm:pt-8 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Ambient WebGL Dither Wave Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <Dither
          waveColor={DITHER_COLOR}
          disableAnimation={false}
          colorNum={4}
          waveAmplitude={0.35}
          waveFrequency={2.5}
          waveSpeed={0.005}
          pixelSize={2.5}
          className="opacity-40"
        />
        {/* Cinematic depth vignette overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[#030303]/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Terminal Monospace Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-zinc-400 select-none">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>root</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
          <span className="text-zinc-200">projects</span>
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400 mb-3 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>terminal://mufid/all-projects</span>
          </div>
          <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.projectsPage.title}{" "}
            <span className="text-white">{t.projectsPage.highlight}</span>
          </h1>
          <p className="mt-2 text-zinc-400 font-mono text-sm sm:text-base">
            {t.projectsPage.subtitle}
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectTerminalCard
              key={project.id}
              project={project}
              index={index}
              language={language}
              staggerStep={0.05}
              t={t.featured}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
