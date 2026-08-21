"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectContent, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GitBranch, Terminal, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TerminalCardProps {
  project: Project;
  index: number;
  language: "en" | "id";
  t: {
    live: string;
    code: string;
  };
}

function ProjectTerminalCard({ project, index, language, t }: TerminalCardProps) {
  const content = getProjectContent(project, language);
  const branchName = project.branch || "main";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="h-full"
    >
      <Link href={`/projects/${project.id}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/15 bg-zinc-950/90 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:border-white/45 hover:shadow-[0_12px_40px_rgba(255,255,255,0.07)] hover:-translate-y-1">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3.5 py-2 transition-colors group-hover:bg-white/[0.06] select-none">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-zinc-700 transition-colors group-hover:bg-zinc-500" />
              <span className="h-2 w-2 rounded-full bg-zinc-700 transition-colors group-hover:bg-zinc-500" />
              <span className="h-2 w-2 rounded-full bg-zinc-700 transition-colors group-hover:bg-zinc-500" />
            </div>
            <span className="font-mono text-[11px] text-zinc-400 transition-colors group-hover:text-white truncate max-w-[170px] sm:max-w-[200px]">
              src/projects/{project.id}.tsx
            </span>
            <div className="flex items-center gap-1 font-mono text-[10px] text-zinc-500">
              <GitBranch className="h-3 w-3" />
              <span>{branchName}</span>
            </div>
          </div>

          {/* Thumbnail Container */}
          <div className="relative aspect-video overflow-hidden bg-zinc-900 border-b border-white/10">
            <Image
              src={project.image}
              alt={content.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Terminal Body Content */}
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-mono text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-white">
                {content.title}
              </h3>
              <span className="font-mono text-[10px] text-zinc-500 border border-white/10 rounded px-1.5 py-0.5 shrink-0">
                v1.0
              </span>
            </div>

            <p className="mt-2 line-clamp-2 font-mono text-xs text-zinc-400 leading-relaxed">
              <span className="text-zinc-500 select-none">// </span>
              {content.description}
            </p>

            {/* Tech Stack Badges */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="font-mono text-[10px] border border-white/10 bg-zinc-900/90 text-zinc-300 transition-colors group-hover:border-white/25 group-hover:text-white"
                >
                  [{tech}]
                </Badge>
              ))}
            </div>

            {/* Action Links */}
            <div className="mt-auto flex items-center gap-4 pt-5 font-mono text-xs text-zinc-400">
              {project.liveUrl && (
                <span className="flex items-center gap-1.5 transition-colors group-hover:text-white">
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t.live}
                </span>
              )}
              {project.githubUrl && (
                <span className="flex items-center gap-1.5 transition-colors group-hover:text-white">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  {t.code}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { language, t } = useLanguage();

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Subtle Ambient Glow & Grid Texture */}
      <div className="pointer-events-none absolute inset-0 animated-grid opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 h-96 w-[700px] rounded-full bg-white/[0.02] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Terminal Monospace Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 font-mono text-xs text-zinc-400 select-none">
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
          className="mb-12"
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
              t={t.featured}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
