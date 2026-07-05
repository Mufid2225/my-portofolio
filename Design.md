# Design System — Portofolio

## Theme
- **Mode**: Dark (default), Light (alternate via `.light` class)
- **Style**: Minimalis modern

## Color Palette

| Token            | Value                  | Usage                    |
| ---------------- | ---------------------- | ------------------------ |
| `--background`   | `oklch(0.145 0 0)`     | Background utama         |
| `--foreground`   | `oklch(0.985 0 0)`     | Text utama               |
| `--card`         | `oklch(0.205 0 0)`     | Card / surface           |
| `--muted`        | `oklch(0.269 0 0)`     | Muted background         |
| `--muted-foreground` | `oklch(0.708 0 0)` | Text secondary           |
| `--border`       | `oklch(1 0 0 / 10%)`   | Border subtle            |
| `--accent`       | `oklch(0.58 0.19 160)` | Emerald accent           |
| `--ring`         | `oklch(0.58 0.19 160)` | Focus ring               |

## Typography
- **Headings**: Inter (sans-serif)
- **Body**: Inter (sans-serif)
- **Monospace**: JetBrains Mono (untuk tech badges)

## Layout
- **Hybrid**: Single-page home + multi-page subpages
- **Halaman**: `/` (home), `/projects`, `/projects/[id]`, `/about`

## Pages

### Home (`/`)
- **Hero**: Foto profil (bulat, emerald glow), nama, role, CTA buttons
- **Featured Projects**: Grid 3 featured project cards, hover scale + glow
- **Tech Stack**: Badge grid dengan emerald outline
- **Contact**: Form kontak + social links (Email, GitHub, LinkedIn)

### Projects (`/projects`)
- **Grid**: Semua project dalam grid responsif (1-3 kolom)
- **Filter**: Chip filter by tech stack
- **Card**: Image, title, description, tech badges, links

### Project Detail (`/projects/[id]`)
- **Layout**: Back button, image hero, title, tech stack, links, description

### About (`/about`)
- **Layout**: Foto (kiri) + bio (kanan) di desktop, stacked di mobile
- **Skills**: All tech badges

## Components
- **Navbar**: Sticky, backdrop-blur, border bottom, hamburger menu mobile
- **Footer**: Border top, copyright, social links
- **ProjectCard**: Reusable card with hover effects
- **Badge**: Tech stack badges (variant: secondary, outline)

## Animations (Framer Motion)
- Fade-in + slide-up on scroll (whileInView)
- Stagger children with delay
- Hover scale + emerald glow pada cards
- Bounce arrow di hero

## Responsive Breakpoints
- Mobile: `sm:` (640px) — single column, hamburger menu
- Tablet: `md:` (768px) — 2 columns
- Desktop: `lg:` (1024px) — 3 columns, max-width 6xl container
