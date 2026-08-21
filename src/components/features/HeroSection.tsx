"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ShapeHero from "@/components/ui/shape-hero";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Shuffle from "@/components/ui/Shuffle";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const nicknames = [
  "Mufid Arhaburrizqi",
  "Nerissa Olivia",
  "Whtfit.",
  "fidnotpid_",
  "1dleraa",
];

export default function HeroSection() {
  const router = useRouter();
  const { t } = useLanguage();
  const [nameIndex, setNameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % nicknames.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ShapeHero>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-center"
      >
        <div className="group relative">
          {/* Sharp Tactical Viewfinder 4-Corner Brackets */}
          <span className="pointer-events-none absolute -top-3 -left-3 h-5 w-5 border-t-2 border-l-2 border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:-top-4.5 group-hover:-left-4.5 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
          <span className="pointer-events-none absolute -top-3 -right-3 h-5 w-5 border-t-2 border-r-2 border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:-top-4.5 group-hover:-right-4.5 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
          <span className="pointer-events-none absolute -bottom-3 -left-3 h-5 w-5 border-b-2 border-l-2 border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:-bottom-4.5 group-hover:-left-4.5 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
          <span className="pointer-events-none absolute -bottom-3 -right-3 h-5 w-5 border-b-2 border-r-2 border-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:-bottom-4.5 group-hover:-right-4.5 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" />

          {/* Avatar Container with Sleek Rings */}
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/30 bg-black/60 p-1.5 shadow-[0_0_35px_rgba(255,255,255,0.08)] ring-1 ring-white/20 transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/profile/avatar.webp"
                alt="Profile"
                fill
                loading="eager"
                sizes="(max-width: 768px) 160px, 160px"
                className="object-cover object-[center_35%] grayscale contrast-[1.1] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
      >
        <Shuffle
          text={t.hero.greeting}
          shuffleDirection="right"
          duration={0.85}
          animationMode="evenodd"
          shuffleTimes={4}
          ease="power2.out"
          stagger={0.06}
          delay={0.25}
          threshold={0.1}
          triggerOnce={true}
          triggerOnHover={false}
          respectReducedMotion={true}
          className="font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          tag="span"
        />
        <br />
        <span className="relative mt-2 inline-block overflow-hidden leading-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={nameIndex}
              className="inline-block font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {nicknames[nameIndex]}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto mt-6 w-full max-w-xl px-4"
      >
        <div className="group relative overflow-hidden rounded-xl border border-white/20 bg-black/85 text-left shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)]">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-3.5 py-1.5 select-none">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-600/80" />
            </div>
            <span className="font-mono text-[11px] text-zinc-400">
              powershell.exe — bio
            </span>
            <div className="w-8" />
          </div>

          {/* Terminal Body */}
          <div className="p-3.5 sm:p-4 font-mono text-xs sm:text-sm leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 text-zinc-400 select-none">
              <span className="text-zinc-500">PS C:\mufid&gt;</span>
              <span className="text-zinc-200">cat bio.txt</span>
            </div>
            <p className="text-zinc-100 font-normal pl-2 border-l border-white/10">
              {t.hero.bio}
              <span className="inline-block ml-1.5 h-3.5 w-2 bg-white terminal-cursor align-middle select-none" />
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <InteractiveHoverButton
          text={t.hero.viewProjects}
          onClick={() => router.push("/projects")}
        />
        <InteractiveHoverButton
          text={t.hero.aboutMe}
          onClick={() => router.push("/about")}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-16"
      >
        <ArrowDown className="mx-auto h-5 w-5 animate-bounce text-muted-foreground" />
      </motion.div>
    </ShapeHero>
  );
}


