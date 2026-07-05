"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Globe, Atom, FileType, FileCode, Server, Paintbrush, GitBranch } from "lucide-react";

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
  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-12 md:grid-cols-[300px_1fr]"
        >
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
          </div>

          <div>
            <h1 className="font-mono text-4xl font-bold tracking-tight text-foreground">
              About <span className="text-emerald-400">Me</span>
            </h1>

            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Halo! Saya seorang Frontend Developer yang passionate dalam
                membangun aplikasi web modern dengan fokus pada performa,
                aksesibilitas, dan user experience.
              </p>
              <p>
                Saya memiliki pengalaman dalam mengembangkan berbagai macam
                aplikasi web menggunakan teknologi terkini seperti Next.js,
                React, TypeScript, dan Tailwind CSS.
              </p>
              <p>
                Saya selalu tertarik untuk mempelajari teknologi baru dan
                menerapkannya dalam project yang memberikan dampak nyata.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="font-mono text-lg font-semibold text-foreground">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
