"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { skills, socialLinks } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import Dither from "@/components/ui/Dither";
import { GithubIcon, InstagramIcon, SpotifyIcon } from "@/components/ui/social-icons";
import {
  Mail,
  MapPin,
  Send,
  Globe,
  Atom,
  FileType,
  FileCode,
  Server,
  Paintbrush,
  GitBranch,
  Database,
  Container,
  Download,
  X,
  Terminal,
  Flame,
  Zap,
  Cpu,
  Bot,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Award,
  User,
  BookOpen,
  Layers,
  Briefcase,
} from "lucide-react";

const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Next.js": Globe,
  React: Atom,
  TypeScript: FileType,
  JavaScript: FileCode,
  Python: Terminal,
  "Node.js": Server,
  Bun: Flame,
  FastAPI: Zap,
  "Tailwind CSS": Paintbrush,
  Git: GitBranch,
  Electron: Atom,
  MySQL: Database,
  SQLite: Database,
  PostgreSQL: Database,
  Redis: Cpu,
  Docker: Container,
  Ollama: Bot,
};

const DITHER_COLOR: [number, number, number] = [0.75, 0.75, 0.75];

interface CertPreview {
  name: string;
  image: string;
}

export default function AboutClient() {
  const [certPreview, setCertPreview] = useState<CertPreview | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!certPreview) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCertPreview(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [certPreview]);

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

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {certPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCertPreview(null)}
            role="dialog"
            aria-modal="true"
            aria-label={certPreview.name}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 p-2 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <Image
                src={certPreview.image}
                alt={certPreview.name}
                width={1200}
                height={900}
                sizes="90vw"
                className="h-auto w-auto max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
              />
              <button
                type="button"
                onClick={() => setCertPreview(null)}
                aria-label="Close certificate preview"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white border border-white/20 transition-all hover:bg-white hover:text-black cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-6xl">
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
          <span className="text-zinc-200 font-semibold">about</span>
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400 mb-3 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>01 // OPERATOR_PROFILE_BENTO</span>
          </div>
          <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.about.title}{" "}
            <span className="text-white">{t.about.highlight}</span>
          </h1>
          <p className="mt-2 text-zinc-400 font-mono text-sm sm:text-base">
            {t.about.quote}
          </p>
        </motion.div>

        {/* 6-Bento Modular Grid Layout */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Bento 1: Operator Identity & Passport (Col 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="md:col-span-1 flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3.5 py-2.5 select-none">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-zinc-700" />
                <span className="h-2 w-2 rounded-full bg-zinc-700" />
                <span className="h-2 w-2 rounded-full bg-zinc-700" />
                <span className="ml-2 font-mono text-[11px] text-zinc-400">
                  id://passport.tsx
                </span>
              </div>
              <User className="h-3.5 w-3.5 text-zinc-500" />
            </div>

            <div className="p-5 flex flex-col items-center flex-1 justify-between">
              {/* Tactical Avatar with Corner Brackets */}
              <div className="group relative my-2">
                <span className="pointer-events-none absolute -top-2 -left-2 h-3.5 w-3.5 border-t-2 border-l-2 border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                <span className="pointer-events-none absolute -top-2 -right-2 h-3.5 w-3.5 border-t-2 border-r-2 border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                <span className="pointer-events-none absolute -bottom-2 -left-2 h-3.5 w-3.5 border-b-2 border-l-2 border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                <span className="pointer-events-none absolute -bottom-2 -right-2 h-3.5 w-3.5 border-b-2 border-r-2 border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />

                <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-white/20 bg-black/60 shadow-[0_0_25px_rgba(255,255,255,0.08)]">
                  <Image
                    src="/profile/avatar.webp"
                    alt="Profile"
                    fill
                    sizes="176px"
                    className="object-cover object-[center_35%] grayscale contrast-[1.1] transition-all duration-500 hover:grayscale-0 hover:scale-105"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mt-3 flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                <span>{t.about.location}</span>
              </div>

              {/* Social Channels Strip */}
              <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="Email"
                >
                  <Mail className="h-3.5 w-3.5" />
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                </a>
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="Telegram"
                >
                  <Send className="h-3.5 w-3.5" />
                </a>
                <a
                  href={socialLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="Spotify"
                >
                  <SpotifyIcon className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Languages */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] border-white/15 bg-white/[0.03] text-zinc-300"
                >
                  [ID // Native]
                </Badge>
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] border-white/15 bg-white/[0.03] text-zinc-300"
                >
                  [EN // Working]
                </Badge>
              </div>

              {/* CV Action Button */}
              {socialLinks.cvUrl ? (
                <a
                  href={socialLinks.cvUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white px-4 py-2.5 font-mono text-xs font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer select-none"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{t.about.downloadCv}</span>
                </a>
              ) : (
                <a
                  href={`mailto:${socialLinks.email}?subject=Request%20CV%20-%20Muhammad%20Mufid`}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white px-4 py-2.5 font-mono text-xs font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer select-none"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{t.about.requestCv}</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Bento 2: Narrative Story / Bio (Col 2-3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.7)] justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 select-none">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <BookOpen className="h-4 w-4 text-zinc-400" />
                  <span>02 // OPERATOR_NARRATIVE.md</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 border border-white/10 rounded px-1.5 py-0.5">
                  READ_ONLY
                </span>
              </div>

              <div className="font-mono text-xs sm:text-sm leading-relaxed text-zinc-300 space-y-3.5">
                <p className="text-zinc-400">
                  <span className="text-zinc-500 select-none">{"// 01 // "}</span>
                  {t.about.p1}
                </p>
                <p className="text-zinc-400">
                  <span className="text-zinc-500 select-none">{"// 02 // "}</span>
                  {t.about.p2}
                </p>
                <p className="text-zinc-400">
                  <span className="text-zinc-500 select-none">{"// 03 // "}</span>
                  {t.about.p3}
                </p>
              </div>
            </div>

            {/* Quote Footer in Bento */}
            <div className="mt-6 rounded-xl border border-white/10 bg-zinc-900/40 p-3.5 font-mono text-xs text-zinc-400 italic">
              &gt; {t.about.quote}
            </div>
          </motion.div>

          {/* Bento 3: Academic Timeline (Col 1-2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="md:col-span-2 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 select-none">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <GraduationCap className="h-4 w-4 text-zinc-400" />
                <span>03 // ACADEMIC_TRACK_RECORD</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                EDUCATION_LOG
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {t.about.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/50 p-4 transition-all hover:border-white/30 hover:bg-zinc-900/80"
                >
                  <span className="inline-block self-start rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-400 mb-2">
                    {edu.period}
                  </span>
                  <div>
                    <p className="font-mono text-xs sm:text-sm font-semibold text-zinc-200">
                      {edu.school}
                    </p>
                    {edu.major && (
                      <p className="font-mono text-[11px] text-zinc-400 mt-1">
                        {edu.major}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bento 4: Verified Credentials & Certificates (Col 3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 select-none">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Award className="h-4 w-4 text-zinc-400" />
                <span>04 // CERTIFICATES</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                {t.about.certificates.length} ITEMS
              </span>
            </div>

            <div className="space-y-2">
              {t.about.certificates.map((cert) => (
                <button
                  key={cert.name}
                  type="button"
                  onClick={() => setCertPreview({ name: cert.name, image: cert.image })}
                  className="group/cert flex w-full items-center justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-2.5 text-left transition-all hover:border-white/35 hover:bg-zinc-800/90 cursor-pointer select-none"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="font-mono text-xs font-medium text-zinc-200 transition-colors group-hover/cert:text-white truncate">
                      {cert.name}
                    </p>
                    <p className="font-mono text-[10px] text-zinc-500 truncate">
                      {cert.desc}
                    </p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover/cert:text-white shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Bento 5: Industry Experience (Full Width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="md:col-span-3 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 select-none">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Briefcase className="h-4 w-4 text-zinc-400" />
                <span>05 // INDUSTRY_EXPERIENCE</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                EXPERIENCE_LOG
              </span>
            </div>

            <div className="space-y-4">
              {t.about.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 sm:p-5 transition-all hover:border-white/30 hover:bg-zinc-900/80"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <p className="font-mono text-sm font-semibold text-zinc-100">
                        {exp.company}
                      </p>
                      <p className="font-mono text-xs text-zinc-400 mt-0.5">
                        {exp.role}
                      </p>
                    </div>
                    <span className="inline-block rounded border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm leading-relaxed text-zinc-400 mt-3">
                    {exp.summary}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bento 6: Full Width Skills Arsenal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="md:col-span-3 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 select-none">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Layers className="h-4 w-4 text-zinc-400" />
                <span>06 // FULL_STACK_ARSENAL</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                {skills.length} CORE TECHNOLOGIES
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => {
                const Icon = skillIcons[skill];
                return (
                  <div
                    key={skill}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-3.5 py-2 font-mono text-xs text-zinc-300 transition-all hover:border-white/35 hover:bg-zinc-800 hover:text-white select-none shadow-sm cursor-pointer"
                  >
                    {Icon && <Icon className="h-3.5 w-3.5 text-zinc-400" />}
                    <span>[{skill}]</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
