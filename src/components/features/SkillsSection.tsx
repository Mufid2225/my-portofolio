"use client";

import { motion } from "framer-motion";
import { LogoCarousel } from "@/components/ui/logo-carousel";

export default function SkillsSection() {
  return (
    <section className="border-t border-border/40 px-4 py-16" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 400px" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h2 className="font-mono text-3xl font-bold tracking-tight text-foreground">
            Tech <span className="text-emerald-400">Stack</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Teknologi yang saya pakai.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <LogoCarousel columnCount={3} />
        </div>
      </div>
    </section>
  );
}
