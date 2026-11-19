"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getProjectContent, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Terminal,
  ExternalLink,
  GitBranch,
  FileCode,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Dither from "@/components/ui/Dither";
import { GithubIcon } from "@/components/ui/social-icons";

const DITHER_COLOR: [number, number, number] = [0.75, 0.75, 0.75];

function formatMediaName(src: string, index: number) {
  const num = String(index + 1).padStart(2, "0");
  const ext = src.split(".").pop()?.toLowerCase() || "webp";
  return `media_${num}.${ext}`;
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const { language, t } = useLanguage();
  const images = [project.image, ...(project.screenshots ?? [])];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  const content = getProjectContent(project, language);
  const branchName = project.branch || "main";
  const currentImage = images[currentIndex] ?? project.image;

  const prev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative min-h-screen pt-6 sm:pt-8 pb-24 px-4 sm:px-6 overflow-hidden">
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

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Terminal Monospace Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 font-mono text-xs text-zinc-400 select-none">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>root</span>
          </Link>
          <span className="text-zinc-600">&gt;</span>
          <Link
            href="/projects"
            className="transition-colors hover:text-white"
          >
            projects
          </Link>
          <span className="text-zinc-600">&gt;</span>
          <span className="text-zinc-200 font-semibold">{content.title}</span>
        </div>

        <article className="space-y-8">
          {/* Main Terminal Window Gallery */}
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 shadow-[0_12px_45px_rgba(0,0,0,0.75)]">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 select-none">
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-zinc-700" />
                <span className="ml-2 font-mono text-xs text-zinc-400 truncate">
                  preview://{project.id}/{formatMediaName(currentImage, currentIndex)}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 shrink-0">
                <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                  <GitBranch className="h-3 w-3" />
                  <span>{branchName}</span>
                </div>
                {images.length > 1 && (
                  <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-300">
                    {currentIndex + 1} / {images.length}
                  </span>
                )}
              </div>
            </div>

            {/* Image Viewport */}
            <div className="group relative aspect-video overflow-hidden bg-zinc-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentImage}
                    alt={`${content.title} preview ${currentIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    unoptimized={currentImage.endsWith(".svg")}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Tactical Overlay Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white shadow-lg transition-all hover:scale-110 hover:border-white/50 hover:bg-white hover:text-black cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white shadow-lg transition-all hover:scale-110 hover:border-white/50 hover:bg-white hover:text-black cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Filmstrip Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto border-t border-white/10 bg-black/40 p-3 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`View preview ${idx + 1}`}
                    className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition-all cursor-pointer ${
                      idx === currentIndex
                        ? "border-white shadow-[0_0_12px_rgba(255,255,255,0.4)] scale-105 opacity-100"
                        : "border-white/10 opacity-50 hover:opacity-80 hover:border-white/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="96px"
                      unoptimized={img.endsWith(".svg")}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Terminal Card */}
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-mono text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                    {content.title}
                  </h1>
                  <span className="font-mono text-xs text-zinc-400 border border-white/15 rounded-md px-2 py-0.5 bg-white/[0.03]">
                    v1.0
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 font-mono text-xs text-zinc-500">
                  <FileCode className="h-3.5 w-3.5 text-zinc-400" />
                  <span>ARCHITECTURE SPECIFICATION</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-mono text-xs font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>{t.projectDetail.liveDemo}</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-zinc-900 px-4 py-2 font-mono text-xs font-medium text-zinc-200 transition-all hover:border-white/40 hover:bg-zinc-800 hover:text-white"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>{t.projectDetail.sourceCode}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="py-6 border-b border-white/10">
              <div className="flex items-center gap-2 mb-3 font-mono text-xs text-zinc-400">
                <Layers className="h-3.5 w-3.5" />
                <span>TECH STACK &amp; DEPENDENCIES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="font-mono text-xs border border-white/10 bg-zinc-900 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                  >
                    [{tech}]
                  </Badge>
                ))}
              </div>
            </div>

            {/* Long Description Specification */}
            <div className="pt-6 font-mono text-sm leading-relaxed text-zinc-300 space-y-4">
              <p className="text-zinc-400">
                <span className="text-zinc-500 select-none">{"// OVERVIEW // "}</span>
                {content.description}
              </p>
              <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 sm:p-6 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                <div className="font-mono text-[11px] text-zinc-500 mb-2 select-none">
                  {"// FULL_SPECIFICATION.md"}
                </div>
                {content.longDescription}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
