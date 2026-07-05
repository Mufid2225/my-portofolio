"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowUpRight, Send } from "lucide-react";
import { socialLinks } from "@/lib/data";

export default function ContactSection() {
  return (
    <section className="border-t border-border/40 px-4 py-20" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 400px" }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="font-mono text-3xl font-bold tracking-tight text-foreground">
            Let&apos;s <span className="text-emerald-400">Connect</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Hubungi saya di platform ini:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
        >
          <Link
            href={`mailto:${socialLinks.email}`}
            className="group flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/50 p-4 text-muted-foreground transition-colors hover:text-emerald-400"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background">
              <Mail className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="truncate text-sm">{socialLinks.email}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/50 p-4 text-muted-foreground transition-colors hover:text-emerald-400"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">GitHub</p>
              <p className="truncate text-sm">Mufid2225</p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/50 p-4 text-muted-foreground transition-colors hover:text-emerald-400"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Instagram</p>
              <p className="truncate text-sm">{socialLinks.instagramUsername}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href={socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/50 p-4 text-muted-foreground transition-colors hover:text-emerald-400"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background">
              <Send className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Telegram</p>
              <p className="truncate text-sm">{socialLinks.telegramUsername}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
