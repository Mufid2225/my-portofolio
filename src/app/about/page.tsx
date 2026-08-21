"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { skills, socialLinks } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
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
} from "lucide-react";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function SpotifyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.18.28-.5.44-.84.44-.2 0-.39-.06-.56-.17-1.82-1.1-4.08-1.35-6.28-.93-.3.06-.6-.14-.66-.44-.06-.3.14-.6.44-.66 2.48-.46 5.02-.19 7.1 1.06.25.15.37.47.22.72l.58-.02zm1.25-2.71c-.22.34-.6.52-.98.52-.22 0-.44-.07-.62-.2-2.12-1.28-4.76-1.63-7.35-1.12-.38.07-.76-.17-.83-.55-.07-.38.17-.76.55-.83 2.89-.57 5.82-.18 8.2 1.26.34.2.47.64.28.98l.75-.06zm.08-2.82c-2.52-1.49-5.69-1.83-8.62-1.24-.45.09-.9-.2-.99-.65-.09-.45.2-.9.65-.99 3.26-.65 6.75-.27 9.59 1.44.4.24.54.76.3 1.16-.24.4-.76.54-1.16.3l.23-.02z" />
    </svg>
  );
}

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

export default function AboutPage() {
  const [certPreview, setCertPreview] = useState<string | null>(null);
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen pt-24 pb-24 px-4 sm:px-6 overflow-hidden">
      {/* Background Subtle Ambient Glow & Grid */}
      <div className="pointer-events-none absolute inset-0 animated-grid opacity-15" />
      <div className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 h-96 w-[800px] rounded-full bg-white/[0.02] blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {certPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCertPreview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 p-2 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <img
                src={certPreview}
                alt="Certificate Preview"
                className="h-auto w-auto max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
              />
              <button
                type="button"
                onClick={() => setCertPreview(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white border border-white/20 transition-all hover:bg-white hover:text-black cursor-pointer"
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

        {/* 4-Bento Modular Grid Layout */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Bento 1: Operator Identity & Passport (Col 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="md:col-span-1 flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/90 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md"
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
                <Link
                  href={`mailto:${socialLinks.email}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="Email"
                >
                  <Mail className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="Telegram"
                >
                  <Send className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={socialLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                  aria-label="Spotify"
                >
                  <SpotifyIcon className="h-3.5 w-3.5" />
                </Link>
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

              {/* Download CV Button */}
              <button
                type="button"
                onClick={() => {}}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white px-4 py-2 font-mono text-xs font-semibold text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{t.about.downloadCv}</span>
              </button>
            </div>
          </motion.div>

          {/* Bento 2: Narrative Story / Bio (Col 2-3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/90 p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md justify-between"
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
                  <span className="text-zinc-500 select-none">// 01 // </span>
                  {t.about.p1}
                </p>
                <p className="text-zinc-400">
                  <span className="text-zinc-500 select-none">// 02 // </span>
                  {t.about.p2}
                </p>
                <p className="text-zinc-400">
                  <span className="text-zinc-500 select-none">// 03 // </span>
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
            className="md:col-span-2 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/90 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md"
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
            className="md:col-span-1 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/90 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md"
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
                <div
                  key={cert.name}
                  onClick={() => setCertPreview(cert.image)}
                  className="group/cert flex items-center justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-2.5 transition-all hover:border-white/35 hover:bg-zinc-800/90 cursor-pointer select-none"
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
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bento 5: Full Width Skills Arsenal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="md:col-span-3 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/90 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 select-none">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Layers className="h-4 w-4 text-zinc-400" />
                <span>05 // FULL_STACK_ARSENAL</span>
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
