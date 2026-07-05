import Link from "next/link";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Portofolio. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={`mailto:${socialLinks.email}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </Link>
          <Link
            href={socialLinks.github}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <Link
            href={socialLinks.instagram}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </Link>
        </div>
      </div>
    </footer>
  );
}
