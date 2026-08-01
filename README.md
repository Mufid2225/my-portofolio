# Portfolio — Muhammad Mufid Arhaburrizky

Portfolio pribadi Muhammad Mufid Arhaburrizky, seorang Frontend Developer dengan minat pada pengembangan web dan Artificial Intelligence. Website ini menampilkan profil, teknologi yang digunakan, sertifikat, kanal kontak, serta project yang pernah dikerjakan atau dikontribusikan.

Dibangun sebagai website frontend statis menggunakan Next.js App Router, TypeScript strict, Tailwind CSS, shadcn/ui, dan Framer Motion.

## Project Showcase

### SiPena

Sistem Perizinan Akademik untuk mendigitalisasi proses pengajuan dan pengelolaan berbagai surat perizinan. Project ini menggunakan Next.js dan TypeScript pada frontend serta Go, Gin, MariaDB, dan Redis pada sisi layanan.

- Live: [sipena-smkn2.dedyn.io](https://www.sipena-smkn2.dedyn.io/)
- Source: [e-letter/e-letter-web](https://github.com/e-letter/e-letter-web)
- Stack: Next.js, TypeScript, Tailwind CSS, Go, Gin, MariaDB, Redis

### RuangTeduh

Aplikasi pencarian coffee shop bergaya neo-brutalism. Pengguna dapat menemukan tempat berdasarkan nama, mood, atmosfer, dan vibes; melihat rekomendasi serta detail tempat; dan menyimpan coffee shop favorit.

- Source: [Mufid2225/ruangteduh](https://github.com/Mufid2225/ruangteduh)
- Stack: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Supabase

### Kasir-App

Aplikasi Point of Sale desktop untuk toko dan UMKM Indonesia. Fitur utamanya mencakup login dan RBAC, checkout atomik, pembayaran Tunai, Debit, dan Xendit QRIS sandbox, shift, inventori, riwayat transaksi, laporan, ekspor CSV/PDF, void/refund, serta struk dengan barcode Code 128.

- Source: [Mufid2225/kasir-app](https://github.com/Mufid2225/kasir-app)
- Stack: Electron, Next.js, React, TypeScript, Tailwind CSS, SQLite

### 9Router

AI router dengan endpoint kompatibel OpenAI untuk mengarahkan request ke berbagai provider, dilengkapi smart fallback dan kompresi token.

- Live: [9Router Database Demo](https://neriss4-9router-database-demo.hf.space/)
- Source: [Hugging Face Space](https://huggingface.co/spaces/Neriss4/9router-database-demo/tree/main)
- Stack: Next.js, React, Tailwind CSS, SQLite, Express

### Aligatour

Website katalog tour and travel untuk menampilkan paket wisata Malang, Batu, dan berbagai destinasi Jawa Timur. Pengunjung dapat melihat harga, destinasi, fasilitas, syarat perjalanan, dan detail layanan sebelum melakukan reservasi melalui WhatsApp.

- Live: [aligatour.netlify.app](https://aligatour.netlify.app/)
- Source: [Mufid2225/aligatour](https://github.com/Mufid2225/aligatour)
- Stack: Next.js, React, TypeScript, Tailwind CSS, Phosphor Icons, Netlify

### Profil GitHub

README profil GitHub dengan hero SVG responsif bertema terminal. Generator Node.js dan Sharp mengubah portrait menjadi ASCII art serta menghasilkan empat varian SVG untuk desktop/mobile dan light/dark theme, lengkap dengan animasi typewriter, moving caret, scan beam, dan metadata aksesibel.

- Live: [github.com/Mufid2225](https://github.com/Mufid2225)
- Source: [Mufid2225/Mufid2225](https://github.com/Mufid2225/Mufid2225)
- Stack: SVG, JavaScript, Node.js, Sharp, GitHub Markdown

### Nerrisa Bot

Asisten AI Telegram privat untuk analisis saham, market, dan ekonomi global; pencarian web; manajemen tugas sekolah; OCR serta ekstraksi PDF/DOCX; dan memory berbasis SQLite. Bot menggunakan 9router sebagai AI engine dan membatasi penggunaan berdasarkan Telegram user ID.

- Bot: [@nerrisa_Bot](https://t.me/nerrisa_Bot)
- Source: [Mufid2225/ai-telegram-bot](https://github.com/Mufid2225/ai-telegram-bot)
- Stack: JavaScript, Node.js, Telegraf, SQLite, 9router, Tesseract.js

### ZeroCost.ai

Direktori katalog penyedia AI, API, dan developer tools dengan free tier. Terdiri dari 15 penyedia AI yang terverifikasi dan teruji, dengan pencarian real-time, filter kategori, halaman detail, bookmark, dark/light mode, serta admin dashboard untuk mengelola penyedia.

- Source: [Mufid2225/zerocost](https://github.com/Mufid2225/zerocost)
- Stack: Next.js, TypeScript, Tailwind CSS

## Fitur Portfolio

- Homepage responsif dengan dark theme dan aksen emerald
- Hero interaktif dengan pergantian nama dan navigasi cepat
- Featured Projects serta halaman daftar project
- Halaman detail project dengan galeri screenshot
- Carousel Tech Stack dengan urutan acak tanpa duplikasi aktif
- Halaman About berisi profil, pendidikan, skill, dan sertifikat
- Navigasi breadcrumb, halaman 404, error boundary, dan debug page
- Animasi antarmuka menggunakan Framer Motion
- Aset gambar WebP yang dikelompokkan berdasarkan kategori dan project

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Framework | Next.js 16 App Router |
| Runtime UI | React 19 |
| Bahasa | TypeScript strict |
| Styling | Tailwind CSS 4 |
| UI | shadcn/ui 4, Radix UI, Base UI |
| Animasi | Framer Motion 12 |
| Ikon | Lucide React |
| Package manager | Bun |

Teknologi yang ditampilkan dalam portfolio mencakup Next.js, React, TypeScript, JavaScript, Node.js, Tailwind CSS, Git, Electron, MySQL, SQLite, PostgreSQL, dan Docker.

## Struktur Project

```text
public/
├── certificates/            Gambar sertifikat
├── icons/                   Aset ikon statis
├── profile/                 Foto profil
└── projects/                Screenshot yang dikelompokkan per project

src/
├── app/                     Route dan layout Next.js App Router
│   ├── about/               Halaman profil
│   ├── projects/            Daftar dan detail project
│   └── debug/               Halaman debug lokal
├── components/
│   ├── features/            Section homepage
│   ├── layout/              Navbar dan Footer
│   ├── magicui/             Efek visual
│   └── ui/                  Komponen UI reusable
└── lib/
    ├── data.ts              Data project, skill, dan social link
    ├── debug.ts             Utility debug
    └── utils.ts             Utility umum
```

Project ini frontend-only. Tidak memakai backend, database, autentikasi, atau API route untuk website portfolio.

## Menjalankan Project

### Prasyarat

- [Bun](https://bun.sh/) 1.3 atau lebih baru

### Instalasi

```bash
git clone <repository-url>
cd portofolio
bun install
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Fungsi |
|---|---|
| `bun run dev` | Menjalankan development server |
| `bun run build` | Membuat production build dan memeriksa TypeScript |
| `bun run start` | Menjalankan production server |
| `bun run lint` | Menjalankan ESLint |

## Build dan Deployment

Validasi production build:

```bash
bun run build
```

Website dapat di-deploy ke platform yang mendukung Next.js, seperti Vercel.

## Kontak

- Email: [mufidarhaburizky08@gmail.com](mailto:mufidarhaburizky08@gmail.com)
- GitHub: [@Mufid2225](https://github.com/Mufid2225)
- Instagram: [@fidnotpid_](https://www.instagram.com/fidnotpid_/)
