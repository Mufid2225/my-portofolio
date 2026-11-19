"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/data";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ProjectTerminalCard } from "@/components/features/ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

const featured = projects.filter((p) => p.featured);

export default function FeaturedProjects() {
  const router = useRouter();
  const { language, t } = useLanguage();

  return (
    <section className="relative border-t border-border/40 px-4 py-24 overflow-hidden">
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
  { path: "/projects/[id]", status: "prerendered" }
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
            <ProjectTerminalCard
              key={project.id}
              project={project}
              index={index}
              language={language}
              staggerStep={0.1}
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
