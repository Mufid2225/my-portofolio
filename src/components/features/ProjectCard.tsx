"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GitBranch } from "lucide-react";
import { getProjectContent, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/social-icons";

interface ProjectCardProps {
  project: Project;
  index: number;
  language: "en" | "id";
  staggerStep?: number;
  t: {
    live: string;
    code: string;
  };
}

export function ProjectTerminalCard({
  project,
  index,
  language,
  staggerStep = 0.05,
  t,
}: ProjectCardProps) {
  const content = getProjectContent(project, language);
  const branchName = project.branch || "main";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * staggerStep, duration: 0.4 }}
      className="h-full"
    >
      <Link href={`/projects/${project.id}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/15 bg-zinc-950/95 shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-white/45 hover:shadow-[0_12px_40px_rgba(255,255,255,0.07)] hover:-translate-y-1">
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
              unoptimized={project.image.endsWith(".svg")}
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
              <span className="text-zinc-500 select-none">{"// "}</span>
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
                  <GithubIcon className="h-3.5 w-3.5" />
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
