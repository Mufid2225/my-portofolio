"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Send, Check, Copy, Terminal, ExternalLink } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

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

export default function ContactSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ports = [
    {
      port: "PORT 25",
      proto: "TCP/MAIL",
      name: "EMAIL_CHANNEL",
      target: socialLinks.email,
      href: `mailto:${socialLinks.email}`,
      icon: Mail,
      isEmail: true,
    },
    {
      port: "PORT 443",
      proto: "HTTPS/GIT",
      name: "SOURCE_REPOS",
      target: "github.com/Mufid2225",
      href: socialLinks.github,
      icon: GithubIcon,
      isEmail: false,
    },
    {
      port: "PORT 80",
      proto: "HTTPS/FEED",
      name: "SOCIAL_FEED",
      target: `@${socialLinks.instagramUsername}`,
      href: socialLinks.instagram,
      icon: InstagramIcon,
      isEmail: false,
    },
    {
      port: "PORT 8443",
      proto: "WSS/DIRECT",
      name: "DIRECT_CHAT",
      target: `@${socialLinks.telegramUsername}`,
      href: socialLinks.telegram,
      icon: Send,
      isEmail: false,
    },
  ];

  return (
    <section
      className="relative border-t border-border/40 px-4 py-24 overflow-hidden"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 450px" }}
    >
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[600px] rounded-full bg-white/[0.02] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400 mb-3 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>03 // NETWORK_PORTS</span>
          </div>
          <h2 className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.contact.title}{" "}
            <span className="text-white">{t.contact.highlight}</span>
          </h2>
          <p className="mt-2 text-zinc-400 font-mono text-sm sm:text-base">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* Terminal Console Window Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/90 shadow-[0_12px_45px_rgba(0,0,0,0.75)] backdrop-blur-md"
        >
          {/* Console Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 select-none">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <div className="ml-2 flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <Terminal className="h-3.5 w-3.5" />
                <span>terminal.exe — connect-gateway</span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>STATUS: LISTENING</span>
            </div>
          </div>

          {/* Console Body */}
          <div className="p-5 sm:p-7 space-y-5">
            {/* Command Prompt */}
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-2 select-none border-b border-white/5 pb-3">
              <span className="text-white">PS C:\mufid\network&gt;</span>
              <span className="text-zinc-200">netstat -an --listen-channels</span>
            </div>

            {/* Port Channels List */}
            <div className="space-y-3 font-mono">
              {ports.map((p) => {
                const Icon = p.icon;

                return (
                  <div
                    key={p.port}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition-all duration-300 hover:border-white/35 hover:bg-zinc-900/90"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-zinc-300 transition-colors group-hover:border-white/30 group-hover:text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-zinc-500 border border-white/10 rounded px-1.5 py-0.5">
                            {p.port}
                          </span>
                          <span className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            [{p.proto}]
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          {p.target}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {p.isEmail ? (
                        <>
                          <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition-all hover:border-white/40 hover:bg-white hover:text-black cursor-pointer"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-black" />
                                <span>COPIED!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>COPY</span>
                              </>
                            )}
                          </button>
                          <Link
                            href={p.href}
                            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>OPEN</span>
                          </Link>
                        </>
                      ) : (
                        <Link
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition-all hover:border-white/40 hover:bg-white hover:text-black"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>CONNECT</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Active Prompt */}
            <div className="pt-2 font-mono text-xs text-zinc-500 flex items-center gap-1.5 select-none">
              <span>PS C:\mufid\network&gt;</span>
              <span className="terminal-cursor inline-block h-3.5 w-2 bg-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
