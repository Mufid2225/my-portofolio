"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { skills, socialLinks } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Send, Globe, Atom, FileType, FileCode, Server, Paintbrush, GitBranch, Download, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const skillIcons: Record<string, React.ElementType> = {
  "Next.js": Globe,
  React: Atom,
  TypeScript: FileType,
  JavaScript: FileCode,
  "Node.js": Server,
  "Tailwind CSS": Paintbrush,
  Git: GitBranch,
};

export default function AboutPage() {
  const [certPreview, setCertPreview] = useState<string | null>(null);

  return (
    <div className="relative overflow-x-hidden px-4 py-20">
      <div className="animated-grid pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-4xl relative">

        <AnimatePresence>
          {certPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCertPreview(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl border border-border/40 bg-card"
              >
                <img
                  src={certPreview}
                  alt="Certificate"
                  className="h-auto w-auto max-h-[85vh] max-w-[85vw] object-contain"
                />
                <button
                  onClick={() => setCertPreview(null)}
                  className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-foreground transition-colors hover:bg-background"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>About</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-12 md:grid-cols-[300px_1fr]"
        >
          <div className="flex flex-col items-center md:items-start">
            <div className="w-full rounded-xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative h-64 w-64 overflow-hidden rounded-xl border-2 border-emerald-500/30 ring-2 ring-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                  <Image
                    src="/avatar.webp"
                    alt="Profile"
                    fill
                    className="object-cover object-[center_35%]"
                    priority
                  />
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>Malang, Jawa Timur, Indonesia</span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Link href={`mailto:${socialLinks.email}`} className="rounded-lg border border-border/40 bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-emerald-400" aria-label="Email">
                    <Mail className="h-4 w-4" />
                  </Link>
                  <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border/40 bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-emerald-400" aria-label="GitHub">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </Link>
                  <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border/40 bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-emerald-400" aria-label="Instagram">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </Link>
                  <Link href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border/40 bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-emerald-400" aria-label="Telegram">
                    <Send className="h-4 w-4" />
                  </Link>
                  <Link href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border/40 bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-emerald-400" aria-label="TikTok">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  </Link>
                  <Link href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border/40 bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-emerald-400" aria-label="Spotify">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.18.28-.5.44-.84.44-.2 0-.39-.06-.56-.17-1.82-1.1-4.08-1.35-6.28-.93-.3.06-.6-.14-.66-.44-.06-.3.14-.6.44-.66 2.48-.46 5.02-.19 7.1 1.06.25.15.37.47.22.72l.58-.02zm1.25-2.71c-.22.34-.6.52-.98.52-.22 0-.44-.07-.62-.2-2.12-1.28-4.76-1.63-7.35-1.12-.38.07-.76-.17-.83-.55-.07-.38.17-.76.55-.83 2.89-.57 5.82-.18 8.2 1.26.34.2.47.64.28.98l.75-.06zm.08-2.82c-2.52-1.49-5.69-1.83-8.62-1.24-.45.09-.9-.2-.99-.65-.09-.45.2-.9.65-.99 3.26-.65 6.75-.27 9.59 1.44.4.24.54.76.3 1.16-.24.4-.76.54-1.16.3l.23-.02z"/></svg>
                  </Link>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs">
                    Indonesia
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs">
                    English
                  </Badge>
                </div>

                <button
                  onClick={() => {}}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm text-emerald-400 transition-colors hover:bg-emerald-500/10"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </button>

                <div className="mt-6 w-full border-t border-border/40 pt-6">
                  <h3 className="text-sm font-semibold text-foreground">Piagam / Sertifikat</h3>
                  <div className="mt-3 space-y-3">
                    <div className="rounded-lg border border-border/40 bg-secondary/30 p-3 transition-colors hover:border-emerald-500/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">UKBI</p>
                          <p className="text-xs text-muted-foreground">Uji Kemahiran Berbahasa Indonesia</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setCertPreview("/UKBI.webp")}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-emerald-400"
                            title="Lihat Sertifikat"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-border/40 bg-secondary/30 p-3 transition-colors hover:border-emerald-500/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">PERAN SAKA</p>
                          <p className="text-xs text-muted-foreground">Peran Ambalan Saka Dirgantara</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setCertPreview("/dirgantara.webp")}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-emerald-400"
                            title="Lihat Sertifikat"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-border/40 bg-secondary/30 p-3 transition-colors hover:border-emerald-500/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Trial Class AR</p>
                          <p className="text-xs text-muted-foreground">Trial Class Augmented Reality</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setCertPreview("/augmented.webp")}
                            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-emerald-400"
                            title="Lihat Sertifikat"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-mono text-4xl font-bold tracking-tight text-foreground">
              About <span className="text-emerald-400">Me</span>
            </h1>

            <p className="mt-2 text-muted-foreground/60 text-sm italic">
              &ldquo;Mencoba, belajar, dan berkembang setiap hari.&rdquo;
            </p>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Halo! Saya seorang Frontend Developer yang suka dalam mencoba berbagai macam hal
                dan saya memiliki ketertarikan tinggi pada teknologi, terutama pada Artificial Intelligence (AI) dan pengembangan web. Saya selalu bersemangat untuk belajar hal baru dan mengembangkan keterampilan saya dalam dunia teknologi.
              </p>
              <p>
                Saya mencoba mengembangkan bermacam - macam
                aplikasi web menggunakan teknologi terkini seperti Next.js,
                React, TypeScript, dan Tailwind CSS.
              </p>
              <p>
                Saya selalu tertarik untuk mempelajari teknologi baru dan
                menerapkannya dalam project untuk menambah pengalaman serta wawasan.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="font-mono text-lg font-semibold text-foreground">
                Skills &amp; Technologies
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const Icon = skillIcons[skill];
                  return (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                    >
                      {Icon && <Icon className="mr-1.5 h-4 w-4" />}
                      {skill}
                    </Badge>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 border-t border-border/40 pt-8">
              <h2 className="font-mono text-lg font-semibold text-foreground">
                Pendidikan
              </h2>
              <div className="mt-4 space-y-6">
                <div className="border-l-2 border-emerald-500/30 pl-4">
                  <p className="text-sm text-muted-foreground">2024 — Sekarang</p>
                  <p className="font-medium text-foreground">SMK Negeri 2 Singosari</p>
                  <p className="text-sm text-muted-foreground">Rekayasa Perangkat Lunak</p>
                </div>
                <div className="border-l-2 border-emerald-500/30 pl-4">
                  <p className="text-sm text-muted-foreground">2021 — 2024</p>
                  <p className="font-medium text-foreground">SMP Negeri 1 Karangploso</p>
                </div>
                <div className="border-l-2 border-emerald-500/30 pl-4">
                  <p className="text-sm text-muted-foreground">2015 — 2021</p>
                  <p className="font-medium text-foreground">SD Negeri 3 Girimoyo</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
