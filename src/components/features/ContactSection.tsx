"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Check, Copy, Terminal, ExternalLink } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { GithubIcon, InstagramIcon } from "@/components/ui/social-icons";

export default function ContactSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(socialLinks.email);
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. non-secure context)
    }
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
    <section className="relative border-t border-border/40 px-3 sm:px-6 py-20 sm:py-24 overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400 mb-3 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>03 // NETWORK_PORTS</span>
          </div>
          <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t.contact.title}{" "}
            <span className="text-white">{t.contact.highlight}</span>
          </h2>
          <p className="mt-2 text-zinc-400 font-mono text-xs sm:text-sm md:text-base max-w-lg mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* Terminal Console Window Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 shadow-[0_12px_45px_rgba(0,0,0,0.75)]"
        >
          {/* Console Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 sm:px-4 py-2.5 sm:py-3 select-none gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 rounded-full bg-zinc-700" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 rounded-full bg-zinc-700" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 rounded-full bg-zinc-700" />
              <div className="ml-1 sm:ml-2 flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-zinc-400 truncate">
                <Terminal className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                <span className="truncate">terminal.exe — connect-gateway</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-zinc-400 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span className="hidden xs:inline">STATUS: </span>
              <span className="text-zinc-300 font-semibold">LISTENING</span>
            </div>
          </div>

          {/* Console Body */}
          <div className="p-4 sm:p-7 space-y-4 sm:space-y-5">
            {/* Command Prompt */}
            <div className="font-mono text-[11px] sm:text-xs text-zinc-400 flex flex-wrap items-center gap-1.5 sm:gap-2 select-none border-b border-white/5 pb-3">
              <span className="text-white font-semibold">PS C:\mufid\network&gt;</span>
              <span className="text-zinc-300">netstat -an --listen-channels</span>
            </div>

            {/* Port Channels List */}
            <div className="space-y-3 font-mono">
              {ports.map((p) => {
                const Icon = p.icon;

                return (
                  <div
                    key={p.port}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-xl border border-white/10 bg-zinc-900/60 p-3 sm:p-4 transition-all duration-300 hover:border-white/35 hover:bg-zinc-900/90"
                  >
                    {/* Left: Icon + Port Details */}
                    <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-zinc-300 transition-colors group-hover:border-white/30 group-hover:text-white mt-0.5 sm:mt-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="text-[10px] sm:text-[11px] text-zinc-400 border border-white/10 rounded px-1.5 py-0.5 bg-white/[0.02]">
                            {p.port}
                          </span>
                          <span className="text-xs font-semibold text-zinc-200 group-hover:text-white truncate">
                            {p.name}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-zinc-500">
                            [{p.proto}]
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-400 mt-1 break-all sm:break-normal truncate">
                          {p.target}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Full width on mobile bottom, aligned on desktop */}
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5 sm:border-0 sm:pt-0 sm:shrink-0 justify-end">
                      {p.isEmail ? (
                        <>
                          <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition-all hover:border-white/40 hover:bg-white hover:text-black cursor-pointer active:scale-95"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-black" />
                                <span className="font-semibold">COPIED!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>COPY</span>
                              </>
                            )}
                          </button>
                          <a
                            href={p.href}
                            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 transition-all hover:border-white/40 hover:bg-white hover:text-black active:scale-95"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>OPEN</span>
                          </a>
                        </>
                      ) : (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs text-zinc-300 transition-all hover:border-white/40 hover:bg-white hover:text-black active:scale-95"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>CONNECT</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Active Prompt */}
            <div className="pt-2 font-mono text-[11px] sm:text-xs text-zinc-500 flex items-center gap-1.5 select-none">
              <span>PS C:\mufid\network&gt;</span>
              <span className="terminal-cursor inline-block h-3.5 w-2 bg-white" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
