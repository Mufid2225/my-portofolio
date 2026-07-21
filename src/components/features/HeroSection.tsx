"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ShapeHero from "@/components/ui/shape-hero";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { MovingBorder } from "@/components/ui/moving-border";
import { ArrowDown } from "lucide-react";

const nicknames = [
  "Mufid Arhaburrizqi",
  "Nerissa Olivia",
  "Whtfit.",
  "fidnotpid_",
  "1dleraa",
];

export default function HeroSection() {
  const router = useRouter();
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
        className="mb-8"
      >
        <div className="relative mx-auto h-44 w-44">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-transparent p-[2px]">
            <div className="absolute inset-0 rounded-full">
              <MovingBorder duration={4000} rx="50%" ry="50%">
                <div className="h-20 w-20 bg-[radial-gradient(#10b981_40%,transparent_60%)]" />
              </MovingBorder>
            </div>
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-emerald-500/30 ring-2 ring-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              <Image
                src="/profile/avatar.webp"
                alt="Profile"
                fill
                className="object-cover object-[center_35%]"
                priority
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
        Hi, I&apos;m
        <br />
        <span className="relative mt-2 inline-block overflow-hidden leading-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={nameIndex}
              className="inline-block font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600"
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

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl"
      >
        Frontend Developer yang suka coba-coba berbagai hal dan punya rasa penasaran yang tinggi.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <InteractiveHoverButton
          text="Lihat Project"
          onClick={() => router.push("/projects")}
        />
        <InteractiveHoverButton
          text="Tentang Saya"
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
