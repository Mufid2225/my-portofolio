"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/ui/language-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/projects", label: t.nav.projects },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo in Monospace */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:text-white select-none"
        >
          <span className="h-2 w-2 rounded-full bg-white/70 transition-colors group-hover:bg-white animate-pulse" />
          <span>MUFID // PORTFOLIO</span>
        </Link>

        {/* Desktop Navigation in Monospace */}
        <div className="hidden items-center gap-5 sm:flex">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 font-mono text-xs sm:text-sm transition-colors",
                  pathname === link.href
                    ? "text-white font-semibold bg-white/[0.08]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.03]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="h-3.5 w-px bg-white/10" />
          <LanguageToggle />
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <LanguageToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-white/10 bg-zinc-950/95 px-4 pb-4 pt-2 sm:hidden backdrop-blur-xl"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 font-mono text-sm transition-colors",
                    pathname === link.href
                      ? "text-white bg-white/10 font-semibold"
                      : "text-zinc-400 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
