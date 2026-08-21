# Design System — Mufid // Portfolio

```
● MUFID // PORTFOLIO  ·  dossier://design/system.md
```

## Konsep

**Monochrome Cyberpunk / Tactical Developer Minimalism**

Seluruh antarmuka dirancang seperti terminal developer: hitam pekat, teks putih dan silver, tanpa warna yang mencolok. Tidak ada emerald, tidak ada gradien warna-warni. Hanya hitam, putih, dan zinc.

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `--background` | `oklch(0.145 0 0)` ≈ `#030303` | Latar belakang utama (jet-black) |
| `--foreground` | `oklch(0.985 0 0)` ≈ `#fafafa` | Teks utama |
| `--card` | `oklch(0.205 0 0)` | Surface kartu |
| `--muted` | `oklch(0.269 0 0)` | Muted background |
| `--muted-foreground` | `oklch(0.708 0 0)` | Teks sekunder (`zinc-400`) |
| `--border` | `oklch(1 0 0 / 10%)` | Border subtle (`white/10`) |
| `--primary` | `oklch(0.985 0 0)` | Putih (tombol, highlight) |

Tidak ada token aksen berwarna — paleta sepenuhnya monokrom.

---

## Typography

| Role | Font | Class |
|---|---|---|
| Semua heading | JetBrains Mono | `font-mono` |
| Semua body teks | JetBrains Mono | `font-mono` |
| Teks UI umum | JetBrains Mono | `font-mono` |

Seluruh teks antarmuka menggunakan `font-mono`. Ini konsisten dari Navbar, Hero, Footer, hingga setiap kartu terminal.

---

## Layout & Pages

```text
/ (home)           Single-page: Hero → Projects → Stack → Contact
/projects          Grid 10 proyek (3 kolom)
/projects/[id]     Detail proyek: galeri terminal + spesifikasi arsitektur
/about             5-Bento Cyber-Window Grid
```

---

## Pages

### Home (`/`)

**Hero Section**
- Background: Bayer 8×8 **Dither Wave** canvas (WebGL/GLSL)
- Cursor: Global Crosshair responsif dengan hover glitch & glow via event delegation
- Avatar: Foto profil bulat dengan 4 sudut bidik taktis `[ + ]`
- Greeting: Teks `"Hi, I'm"` dengan animasi **Shuffle** (4 glyphs, 1× on mount)
- Nama: Pergantian nama animasi dengan `AnimatePresence` slide vertical
- Bio: **PowerShell CLI Window** dengan step-blink cursor

**Featured Projects**
- Desain: **Cyber-Terminal Card Window** (3 kartu featured)
- Terminal Header Bar: 3 titik kontrol, file path `src/projects/{id}.tsx`, branch indicator
- Background: Full-height Code Matrix Watermark (`01 |` hingga `44 |`) dengan log environment di sisi kanan
- Konten kartu: Judul monospace, komentar kode `// deskripsi`, badges `[{tech}]`

**Tech Stack**
- Desain: **Dual Infinite Marquee Ribbon** (2 baris mengalir berlawanan arah)
- Baris atas: scroll kiri, Baris bawah: scroll kanan
- Hover pada satu baris hanya memberhentikan baris tersebut (independent pause)

**Contact**
- Desain: **Terminal CLI Console Window** — output `netstat` dengan 4 port
- Email, GitHub, Instagram: click-to-copy dengan feedback `[COPIED!]`
- Step-blink cursor hardware

**Footer**
- Desain: **Developer System Status** — `● SYSTEMS OPERATIONAL | WIB (UTC+7)`
- Quick nav: Home · Projects · About
- Copyright monospace

---

### Projects (`/projects`)

- Breadcrumb: `<Terminal /> root > projects`
- Badge header: `terminal://mufid/all-projects`
- Grid 10 kartu proyek, 3 kolom (lg)
- Setiap kartu: **Cyber-Terminal Card Window** identik dengan Featured Projects
- Hover: micro-lift (`-translate-y-1`) + border glow

---

### Project Detail (`/projects/[id]`)

- Breadcrumb: `root > projects > {title}`
- **Galeri Terminal Window**: Header bar dengan path `preview://{id}/media_{n}.webp`, branch indicator, counter `[n / total]`
- Navigasi gambar: Tombol kaca melingkar prev/next + **Thumbnail Filmstrip** + keyboard `←` `→`
- **Specification Card**: Judul + badge `v1.0`, tombol `Live Demo` & `Source Code`, badges `[{tech}]`, blok `// FULL_SPECIFICATION.md`

---

### About (`/about`)

- Breadcrumb: `root > about`
- Header: `01 // OPERATOR_PROFILE_BENTO`
- **5-Bento Modular Grid** (3 kolom):
  1. **`id://passport.tsx`** *(col 1)*: Avatar dengan 4 sudut bidik, lokasi, sosial, bahasa `[ID] [EN]`, Download CV
  2. **`OPERATOR_NARRATIVE.md`** *(col 2-3)*: Bio `// 01 //` `// 02 //` `// 03 //` + quote terminal
  3. **`ACADEMIC_TRACK_RECORD`** *(col 1-2)*: 3 kartu grid sekolah dengan badge periode
  4. **`CERTIFICATES`** *(col 3)*: Daftar sertifikat click-to-preview lightbox
  5. **`FULL_STACK_ARSENAL`** *(col 1-3, full width)*: 17 keahlian dengan tag `[{tech}]` + ikon

---

## Components

### Terminal Card Window
Pattern umum untuk kartu proyek dan kotak bento:

```tsx
// Header bar
<div className="... border-b border-white/10 bg-white/[0.03] ...">
  ● ● ●  ·  src/projects/{id}.tsx  ·  branch: main
</div>
// Body
<div className="bg-zinc-950/90 border border-white/15 rounded-2xl ...">
  {/* konten */}
</div>
```

### Navbar
- Brand: `● MUFID // PORTFOLIO` (monospace)
- Nav links: `Home`, `Projects`, `About` (monospace)
- Language toggle: `[ID | EN]` (monospace)

### Footer
- Status: `● SYSTEMS OPERATIONAL | WIB (UTC+7)` (live clock)
- Copyright + quick nav links

### Crosshair
- Komponen global di `ClientWrapper.tsx`
- Event delegation: `window.addEventListener('mouseover')` — trigger pada semua elemen interaktif secara dinamis
- Efek: glitch + glow saat hover ke tombol, kartu, avatar, dan link

---

## Animations

| Animasi | Implementasi |
|---|---|
| Dither Wave Hero | WebGL canvas GLSL shader (Bayer 8×8) |
| Shuffle Greeting | Custom `Shuffle.tsx` component, 4 glyph rolls, 1× on mount |
| Nama pergantian | Framer Motion `AnimatePresence` + slide vertical |
| Terminal Cursor | CSS `@keyframes` step-blink (hardware feel) |
| Marquee Ribbon | CSS `@keyframes marquee-left` + `marquee-right` |
| Card hover lift | `hover:-translate-y-1` Tailwind |
| Page fade-in | Framer Motion `initial opacity:0 y:20 → opacity:1 y:0` |
| Screenshot gallery | Framer Motion `AnimatePresence mode="wait"` |
| Lightbox modal | Framer Motion `scale 0.92 → 1` |
| Crosshair glitch | CSS class toggle via JS event delegation |

---

## Responsive Breakpoints

| Breakpoint | Nilai | Kolom Grid |
|---|---|---|
| Mobile | < 640px | 1 kolom |
| sm | 640px | 2 kolom |
| lg | 1024px | 3 kolom (maks) |

---

## Design Constraints

1. **Tidak ada warna aksen berwarna** — hanya putih, zinc, dan hitam.
2. **Semua teks UI** — wajib `font-mono`.
3. **Background** — selalu `#030303` jet-black, bukan true black.
4. **Hover effects** — border glow putih halus (`white/30` → `white/50`), bukan shadow berwarna.
5. **Tombol utama** — putih solid (`bg-white text-black`) sebagai elemen CTA kontras tertinggi.
6. **Terminal path format** — `filename://path/to/file.tsx` sebagai label header kartu.
7. **Badge format** — `[{tech}]` bracket monospace, bukan plain text badge.
