"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { projects, getProjectContent, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ExternalLink, GitBranch } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const featured = projects.filter((p) => p.featured);

interface TerminalCardProps {
  project: Project;
  index: number;
  language: "en" | "id";
  t: {
    live: string;
    code: string;
  };
}

function TerminalProjectCard({ project, index, language, t }: TerminalCardProps) {
  const content = getProjectContent(project, language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
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
            <span className="font-mono text-[11px] text-zinc-400 transition-colors group-hover:text-white">
              src/projects/{project.id}.tsx
            </span>
            <div className="flex items-center gap-1 font-mono text-[10px] text-zinc-500">
              <GitBranch className="h-3 w-3" />
              <span>main</span>
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
              <span className="font-mono text-[10px] text-zinc-500 border border-white/10 rounded px-1.5 py-0.5">
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

export default function FeaturedProjects() {
  const router = useRouter();
  const { language, t } = useLanguage();

  return (
    <section
      className="relative border-t border-border/40 px-4 py-24 overflow-hidden"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}
    >
      {/* Background Code Matrix Streams (Option 4 - Full Height) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        {/* Left Side Code Stream */}
        <div className="absolute left-2 xl:left-8 top-8 bottom-6 font-mono text-[11px] leading-relaxed text-zinc-400 opacity-35 whitespace-pre">
{`01 | // INITIALIZE DEVELOPER WORKSPACE
02 | import { createSystem } from "@core/engine";
03 | const repo = await Git.clone("Mufid2225/portfolio");
04 | 
05 | export async function renderShowcase() {
06 |   const stack = ["Next.js", "TypeScript", "Tailwind", "GSAP"];
07 |   const state = await analyzeArchitecture();
08 |   return stack.map(tech => ({
09 |     status: "PRODUCTION_READY",
10 |     optimized: true,
11 |     fps: 60
12 |   }));
13 | }
14 | 
15 | // 01001101 01010101 01000110 01001001 01000100
16 | // ARCHITECTURE // LOW-LATENCY ENGINE
17 | 
18 | interface FeatureMatrix {
19 |   terminal: "active";
20 |   crosshair: "enabled";
21 |   dither: "bayer-8x8";
22 |   theme: "monochrome-dark";
23 | }
24 | 
25 | export const runtime = "edge";
26 | export const dynamic = "force-static";
27 | 
28 | const telemetry = new TelemetryClient({
29 |   heartbeat: "continuous",
30 |   logLevel: "debug",
31 |   metrics: ["lcp", "fid", "cls"]
32 | });
33 | 
34: function verifyIntegrity(buildHash: string) {
35:   const checksum = crypto.sha256(buildHash);
36:   return checksum.startsWith("0x");
37: }
38: 
39: // DEPLOYMENT TARGET: VERCEL EDGE
40: // BUILD TIME: 8.7s // TURBOPACK OK
41: // BUNDLE SIZE: 82.4 KB (GZIPPED)
42: // STABLE STATUS 200 OK
43: // EOF // END OF WORKSPACE`}
        </div>

        {/* Right Side Code Stream */}
        <div className="absolute right-2 xl:right-8 top-8 bottom-6 font-mono text-[11px] leading-relaxed text-zinc-400 opacity-35 whitespace-pre text-right">
{`// SYSTEM ENVIRONMENT // 01
const config = {
  theme: "dark",
  accent: "monochrome",
  motion: "fluid-60fps",
  compiler: "turbopack"
};

function deployBuild() {
  return pipeline.execute({
    status: 200,
    deployedAt: new Date().toISOString()
  });
}

// STATUS: OPERATIONAL // 60 FPS
// HASH: 0x9f82b4a1c5e9...

const routes = [
  { path: "/", status: "prerendered" },
  { path: "/about", status: "prerendered" },
  { path: "/projects", status: "prerendered" },
  { path: "/projects/[id]", status: "dynamic" }
];

async function compileModules() {
  const chunks = await turbopack.build();
  return chunks.validate();
}

// AUDIT: ACCESSIBILITY 100%
// AUDIT: PERFORMANCE 100%
// AUDIT: BEST_PRACTICES 100%
// AUDIT: SEO 100%

// MEMORY BUFFER: 4.2 MB / 512 MB
// THREADS: 7 ACTIVE WORKERS
// CLUSTER: LOCALHOST:3000
// READY FOR INTERACTION //`}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400 mb-3 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>terminal://mufid/featured-projects</span>
          </div>
          <h2 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.featured.title}{" "}
            <span className="text-white">{t.featured.highlight}</span>
          </h2>
          <p className="mt-2 text-zinc-400 font-mono text-sm sm:text-base">
            {t.featured.subtitle}
          </p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <TerminalProjectCard
              key={project.id}
              project={project}
              index={index}
              language={language}
              t={t.featured}
            />
          ))}
        </div>

        {/* View All CTA Button */}
        {projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <InteractiveHoverButton
              text={t.featured.viewAll}
              onClick={() => router.push("/projects")}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
