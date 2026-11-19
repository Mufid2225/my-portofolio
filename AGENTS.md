<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Portfolio AI Agent Protocol

## 1. Project Identity

This is a **personal portfolio website** for Muhammad Mufid Arhaburrizky — a static frontend-only site. No backend, no database, no API routes, no authentication.

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.4.6 (App Router) |
| Language | TypeScript (strict) |
| UI | shadcn/ui v4 (base-nova, @base-ui/react) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 + GSAP 3.15 |
| Icons | Lucide React 1.75 |
| Package Manager | Bun 1.4 |

## 3. Absolute Rules (Violation = Reject)

| N | Rule |
|---|---|
| N1 | **Never remove or alter design elements** (gradient overlays, fade transitions, layout structure) without asking first. |
| N2 | **Never rewrite entire files.** Prefer minimal, targeted edits. |
| N3 | **No `any` types.** Use `unknown`, generics, or explicit types. |
| N4 | **Never use deprecated APIs.** `priority` prop on `<Image>` is deprecated; use `qualities: [75]` in next.config. `asChild` on shadcn button is NOT supported. |
| N5 | **Always verify lint & build** after changes: `bun run lint` and `bun run build`. |
| N6 | **Never hallucinate components, imports, or features** that don't exist in the codebase. Read source files to verify. |

## 4. Design Constraints

- **Theme:** Dark mode default (`class="dark"` on `<html>`), Monochrome Cyber-Terminal palette (`#030303` jet-black background, white & zinc monochrome hierarchy, `font-mono` JetBrains Mono). No emerald or colored accents.
- **Performance:** Keep rendering lightweight. WebGL `Dither` uses `IntersectionObserver` to pause offscreen; avoid `backdrop-blur`, heavy CSS `blur-[...]` filters, and duplicate background animations.
- **Buttons:** Use `InteractiveHoverButton` from `@/components/ui/interactive-hover-button` when a styled CTA button is needed.
- **Social links:** Email (`mufidarhaburizky@gmail.com`), GitHub (`Mufid2225`), Instagram (`fidnotpid_`), Telegram (`@1dleraa`), Spotify. No LinkedIn. No contact form.

## 5. SOP for Tasks

1. **READ** — Read the full file(s) affected before making changes.
2. **PLAN** — Bullet points of what will change.
3. **ASK** — If the change affects design, layout, or visible output, ask first.
4. **EXECUTE** — Minimal edits only.
5. **VERIFY** — `bun run lint` and `bun run build` must pass (0 errors, compiled + types).
6. **DONE** — Confirm.

## 6. Coding Standards

- Client components: `"use client"` at top. Server components: default for `page.tsx` (with `metadata` / `generateMetadata`).
- PascalCase for components/files. camelCase for functions/variables.
- Tailwind CSS v4 utility classes only. No `@apply`. No inline styles (except truly dynamic values).
- `import type` for type-only imports.
- Lucide icons: use from `lucide-react` (check available exports first — some icons removed in v1.x).

## 7. Key Deprecation Notes (Next.js 16.4)

- `params` in `page.tsx` is `Promise` — must `await`.
- `priority` prop on `<Image>` is deprecated — use `qualities: [75]` in config instead.
- `<Image>` requires `sizes` prop for responsive images.
- `shadcn/ui` button (`@base-ui/react/button`) does NOT support `asChild` — use `<a>` with `className` styling for link buttons.
