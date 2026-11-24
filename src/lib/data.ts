export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  description_en?: string;
  longDescription_en?: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  branch?: string;
  featured: boolean;
  screenshots?: string[];
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "SiPena",
    description: "Sistem Perizinan Akademik (SiPena) untuk digitalisasi pengajuan & pengelolaan surat izin siswa, guru, dan staff. Multi-role auth, workflow approval, notifikasi real-time, OTP verifikasi, dan audit log.",
    longDescription: "SiPena (Sistem Perizinan Akademik) adalah platform digital untuk mengelola seluruh siklus hayat surat izin di lingkungan sekolah — dari pengajuan oleh siswa/guru/staff, review multi-tingkat (wali kelas, BK, tu, kepsek), hingga penerbitan surat digital dengan QR code verifikasi. Fitur utama: login berbasis OTP & RBAC, dashboard peran (siswa, guru, admin), pengajuan izin sakit/acara/keluar sekolah, workflow approval bertahap, notifikasi real-time (WebSocket), riwayat & log aktivitas lengkap, cetak surat dengan barcode Code 128, serta panel admin untuk master data (kelas, guru, template surat, pengguna). Frontend Next.js + TypeScript + Tailwind; backend Go/Gin + MariaDB + Redis untuk caching & session.",
    description_en: "Academic Permission System (SiPena) to digitize the submission & management of leave permits for students, teachers, and staff. Multi-role auth, approval workflows, real-time notifications, OTP verification, and audit logs.",
    longDescription_en: "SiPena (Academic Permission System) is a digital platform designed to manage the entire lifecycle of student, teacher, and staff permission letters — from submission, multi-tier approvals (homeroom teachers, counseling, administration, principal), to digital letter issuance with verification QR codes. Key features include OTP & RBAC authentication, role-based dashboards, leave requests, stepped approval workflows, real-time WebSocket notifications, full audit logs, and Code 128 barcode printing. Built with Next.js, TypeScript, Tailwind CSS on the frontend, and Go/Gin, MariaDB, Redis on the backend.",
    image: "/projects/sipena/sipena.webp",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Go", "Gin", "MariaDB", "Redis"],
    githubUrl: "https://github.com/e-letter/e-letter-web",
    featured: true,
    screenshots: [
      "/projects/sipena/login-siswa.webp",
      "/projects/sipena/home-siswa.webp",
      "/projects/sipena/daftar-siswa.webp",
      "/projects/sipena/masuk-siswa.webp",
      "/projects/sipena/keluar-siswa.webp",
      "/projects/sipena/notif-siswa.webp",
      "/projects/sipena/otp-siswa.webp",
      "/projects/sipena/panduan1-siswa.webp",
      "/projects/sipena/panduan2-siswa.webp",
      "/projects/sipena/profil-siswa.webp",
      "/projects/sipena/riwayat-siswa.webp",
      "/projects/sipena/log-siswa.webp",
    ],
  },
  {
    id: "project-2",
    title: "RuangTeduh",
    description: "Aplikasi pencarian coffee shop bergaya neo-brutalism untuk menemukan tempat yang tenang, estetik, dan produktif berdasarkan mood, atmosfer, dan vibes.",
    longDescription: "RuangTeduh adalah aplikasi pencarian coffee shop bergaya neo-brutalism yang mengutamakan pengalaman emosional, bukan hanya rating dan menu. Pengguna dapat mencari café berdasarkan nama, memfilter berdasarkan mood dan vibes, melihat rekomendasi serta detail dinamis setiap tempat, dan menyimpan coffee shop favorit untuk menemukan ruang yang cocok untuk fokus, healing, night coding, atau bekerja sendiri.",
    description_en: "A neo-brutalism coffee shop discovery app to find calm, aesthetic, and productive workspaces based on mood, atmosphere, and vibes.",
    longDescription_en: "RuangTeduh is a neo-brutalism styled coffee shop discovery application focusing on emotional experiences beyond mere ratings and menus. Users can search cafés by name, filter by mood and ambiance, explore dynamic venue details and recommendations, and save favorites to find the perfect spot for focus, healing, night coding, or solo work.",
    image: "/projects/ruang-teduh/1dashboard.webp",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase"],
    githubUrl: "https://github.com/Mufid2225/ruangteduh",
    liveUrl: undefined,
    featured: true,
    screenshots: [
      "/projects/ruang-teduh/2recommend.webp",
      "/projects/ruang-teduh/3searchfilter-1.webp",
      "/projects/ruang-teduh/4searchfilter-2.webp",
      "/projects/ruang-teduh/5detail.webp",
      "/projects/ruang-teduh/6favorite.webp",
    ],
  },
  {
    id: "project-4",
    title: "Kasir-App",
    description: "Aplikasi Point of Sale desktop untuk toko dan UMKM Indonesia dengan checkout, inventori, shift, laporan, serta pembayaran Tunai, Debit, dan QRIS.",
    longDescription: "Aplikasi Point of Sale desktop untuk toko dan UMKM Indonesia. Kasir-App menyediakan login SQLite dan RBAC, checkout atomik, pembayaran Tunai, Debit, dan Xendit QRIS sandbox, pengelolaan shift, inventori, riwayat transaksi, laporan, ekspor CSV/PDF, void/refund lokal, pengaturan toko, serta struk dinamis dengan barcode Code 128.",
    description_en: "Desktop Point of Sale application for Indonesian retail and MSMEs featuring checkout, inventory, shift tracking, reporting, and Cash, Debit, and QRIS payments.",
    longDescription_en: "Desktop Point of Sale application for Indonesian retail shops and MSMEs. Kasir-App offers SQLite authentication and RBAC, atomic checkout, Cash, Debit, and Xendit QRIS payments, shift management, inventory tracking, transaction history, analytical reports, CSV/PDF exports, local refunds, and dynamic receipt printing with Code 128 barcodes.",
    image: "/projects/kasir-app/1login-page.webp",
    techStack: ["Electron", "Next.js", "React", "TypeScript", "Tailwind CSS", "SQLite"],
    screenshots: [
      "/projects/kasir-app/2dashboard-page.webp",
      "/projects/kasir-app/3riwayat-page.webp",
      "/projects/kasir-app/4inventori-page.webp",
      "/projects/kasir-app/5laporan-page.webp",
      "/projects/kasir-app/6pengguna-page.webp",
      "/projects/kasir-app/7penggaturan-page.webp",
      "/projects/kasir-app/8profil-page.webp",
      "/projects/kasir-app/9trx-modal.webp",
      "/projects/kasir-app/10struk-modal.webp",
      "/projects/kasir-app/11ekspor-modal.webp",
      "/projects/kasir-app/12tambahproduk-modal.webp",
      "/projects/kasir-app/13shift-modal.webp",
    ],
    githubUrl: "https://github.com/Mufid2225/kasir-app",
    featured: true,
  },
  {
    id: "project-5",
    title: "Aligatour",
    description: "Website katalog tour and travel untuk menjelajahi paket wisata Malang, Batu, dan destinasi Jawa Timur serta melakukan reservasi melalui WhatsApp.",
    longDescription: "Aligatour adalah website katalog tour and travel yang menampilkan layanan wisata Malang, Batu, dan berbagai destinasi Jawa Timur. Pengunjung dapat melihat pilihan paket, harga, destinasi, fasilitas, syarat perjalanan, dan halaman detail untuk enam layanan, lalu menghubungi Aligatour melalui WhatsApp untuk reservasi. Website responsif ini juga dilengkapi informasi kontak, media sosial, dan metadata pada setiap halaman trip.",
    description_en: "Tour & travel catalog website to explore vacation packages in Malang, Batu, and East Java destinations with seamless WhatsApp reservations.",
    longDescription_en: "Aligatour is a tour and travel catalog website showcasing tour packages in Malang, Batu, and various East Java destinations. Visitors can explore package options, pricing, destinations, facilities, travel terms, and detailed itinerary pages, then easily contact Aligatour via WhatsApp for direct bookings. Built with Next.js, React, TypeScript, and Tailwind CSS.",
    image: "/projects/aligatour/1dashboard.webp",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Phosphor Icons", "Netlify"],
    screenshots: [
      "/projects/aligatour/2pilihanpaket1.webp",
      "/projects/aligatour/3pilihanpaket2.webp",
      "/projects/aligatour/4slogan.webp",
      "/projects/aligatour/5review.webp",
      "/projects/aligatour/6footer.webp",
      "/projects/aligatour/7detailhero.webp",
      "/projects/aligatour/8detailfacilities1.webp",
      "/projects/aligatour/9detailfacilities2.webp",
      "/projects/aligatour/10detailpaket.webp",
      "/projects/aligatour/11syarat.webp",
    ],
    liveUrl: "https://aligatour.netlify.app/",
    githubUrl: "https://github.com/Mufid2225/aligatour",
    featured: false,
  },
  {
    id: "project-6",
    title: "Profil GitHub",
    description: "README profil GitHub minimal yang seluruhnya berupa hero SVG GitAscii bertema terminal, digenerasi otomatis via GitHub Actions dan beradaptasi ke light/dark mode lewat elemen picture.",
    longDescription: "Profil GitHub personal kini tampil minimal: seluruh README diisi satu hero SVG GitAscii bertema terminal yang digenerasi dan diperbarui otomatis oleh workflow GitHub Actions \"Update GitAscii\". Varian dark dan light dipilih otomatis oleh elemen HTML picture sesuai prefers-color-scheme, menyajikan identitas, telemetri aktivitas, dan statistik kontribusi dalam satu komposisi terminal. Pendekatan ini menggantikan layout README lama (about, featured projects, snake graph, footer) dengan satu artefak visual yang selalu sinkron dengan aktivitas GitHub terbaru.",
    description_en: "Minimal GitHub profile README consisting entirely of a terminal-themed GitAscii SVG hero, auto-generated by GitHub Actions and adapting to light/dark mode via the picture element.",
    longDescription_en: "The personal GitHub profile now takes a minimal form: the whole README is a single terminal-themed GitAscii SVG hero generated and refreshed automatically by the \"Update GitAscii\" GitHub Actions workflow. Dark and light variants are selected automatically by the HTML picture element based on prefers-color-scheme, presenting identity, activity telemetry, and contribution statistics in one terminal composition. This replaces the older README layout (about, featured projects, snake graph, footer) with a single visual artifact that stays in sync with the latest GitHub activity.",
    image: "/projects/profil-github/1hero.webp",
    techStack: ["SVG", "JavaScript", "Node.js", "Sharp", "GitHub Actions", "GitHub Markdown"],
    screenshots: [
      "/projects/profil-github/2terminal.webp",
      "/projects/profil-github/3telemetry.webp",
      "/projects/profil-github/4contribution.webp",
    ],
    liveUrl: "https://github.com/Mufid2225",
    githubUrl: "https://github.com/Mufid2225/Mufid2225",
    featured: false,
  },
  {
    id: "project-7",
    title: "Nerrisa Bot",
    description: "Asisten AI Telegram privat berbasis OpenAI API dengan menu interaktif, MoneyTracker (Google Sheets), Google Calendar, Trello, Notion, Superhuman Docs, analisis saham/ekonomi, OCR/PDF, dan SQLite.",
    longDescription: "Nerrisa Bot adalah asisten AI Telegram privat berbasis Node.js (ESM), Telegraf, dan OpenAI API. Dilengkapi menu inline interaktif (/menu) yang terhubung ke MoneyTracker (Google Sheets + grafik Chart.js), Google Calendar, Trello, Notion, Superhuman Docs, dan Knowledge Base lokal (read-only). Bot juga menggabungkan Yahoo Finance, Alpha Vantage, dan FMP untuk analisis saham & ekonomi makro, pencarian web berjenjang (Tavily, NewsAPI, SerpAPI), pemrosesan file OCR/PDF/DOCX, serta catatan, reminder, dan memori persisten di SQLite. Akses perintah dikunci ke Telegram user ID yang dikonfigurasi.",
    description_en: "Private Telegram AI assistant powered by OpenAI API with interactive menus, MoneyTracker (Google Sheets), Google Calendar, Trello, Notion, Superhuman Docs, market analysis, OCR/PDF, and SQLite memory.",
    longDescription_en: "Nerrisa Bot is a private Telegram AI assistant built with Node.js (ESM), Telegraf, and OpenAI API. It features an interactive inline /menu connected to MoneyTracker (Google Sheets + Chart.js visuals), Google Calendar, Trello, Notion, Superhuman Docs, and a read-only local Knowledge Base. It also integrates Yahoo Finance, Alpha Vantage, and FMP for market and macro analysis, tiered web search (Tavily, NewsAPI, SerpAPI), OCR/PDF/DOCX file extraction, and persistent SQLite notes, reminders, and memory.",
    image: "/projects/telegram-bot/1profil.webp",
    techStack: ["JavaScript", "Node.js", "Telegraf", "OpenAI API", "SQLite", "Chart.js", "Tesseract.js"],
    screenshots: [
      "/projects/telegram-bot/2start.webp",
      "/projects/telegram-bot/3fitur.webp",
    ],
    liveUrl: "https://t.me/nerrisa_Bot",
    githubUrl: "https://github.com/Mufid2225/ai-telegram-bot",
    featured: false,
  },
  {
    id: "project-8",
    title: "ZeroCost.ai",
    description: "Direktori katalog penyedia AI, API, dan developer tools dengan free tier. Terdiri dari 15 penyedia AI yang sudah diverifikasi, teruji, dan dikatalogkan secara manual.",
    longDescription: "ZeroCost.ai adalah direktori katalog penyedia AI, API, dan developer tools dengan free tier. Dibangun sebagai katalog yang terverifikasi — hanya admin yang menguji dan menambahkan penyedia setelah verifikasi. Pengguna dapat menjelajahi, mencari, memfilter, dan mengakses kode untuk integrasi instan.",
    description_en: "Directory catalog of AI providers, APIs, and developer tools with free tiers. Includes 15 verified, tested, and manually curated AI services.",
    longDescription_en: "ZeroCost.ai is a curated directory of AI service providers, APIs, and developer tools offering free tiers. Built as a verified catalog where each provider is manually tested before listing. Users can browse, search, filter, and access instant integration code.",
    image: "/projects/zerocost/zerocost1.webp",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Mufid2225/zerocost",
    featured: false,
    screenshots: [
      "/projects/zerocost/zerocost2.webp",
      "/projects/zerocost/zerocost3.webp",
      "/projects/zerocost/zerocost4.webp",
      "/projects/zerocost/zerocost5.webp",
      "/projects/zerocost/zerocost6.webp",
      "/projects/zerocost/zerocost7.webp",
      "/projects/zerocost/zerocost8.webp",
      "/projects/zerocost/zerocost9.webp",
      "/projects/zerocost/zerocost10.webp",
    ],
  },
  {
    id: "project-9",
    title: "STARTOVER",
    description: "Platform editorial financial intelligence untuk memahami pasar global & Indonesia melalui market data, analisis teknikal, berita keuangan, kalender ekonomi, sentiment/score/regime/risk deterministik, watchlist, dan pencarian global.",
    longDescription: "STARTOVER adalah platform riset pasar yang dirancang sebagai produk editorial tenang, bukan dashboard trading generik. Menyediakan: overview pasar editorial, daftar & detail pasar, feed berita, kalender ekonomi, daily brief, UI ask analyst, watchlist lokal anonim, pencarian global, filter fungsional, tema terang/gelap, navigasi responsif, interaksi Motion, dukungan loading/error/empty/reduced-motion, indikator teknikal (SMA, EMA, RSI, momentum, volatility), sentiment/score/regime/risk/evidence deterministik, registry provider dengan validasi/normalisasi/deduplikasi/freshness/health, metadata provenance. Semua data eksternal saat ini SIMULASI (mock provider). Arsitektur siap untuk integrasi provider real dan persistensi PostgreSQL.",
    description_en: "Editorial financial intelligence platform to understand global & Indonesian markets through market data, technical analysis, financial news, economic calendars, deterministic sentiment/regime/risk scores, watchlists, and global search.",
    longDescription_en: "STARTOVER is a market research platform designed as a calm editorial product rather than a noisy trading dashboard. Provides editorial market overviews, market directories, news feeds, economic calendars, daily briefs, ask analyst UI, anonymous local watchlists, global search, technical indicators (SMA, EMA, RSI), deterministic sentiment/risk scoring, provider validation and deduplication pipelines, and architecture ready for real provider integration and PostgreSQL persistence.",
    image: "/projects/startover/1hero.webp",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Zod", "Drizzle ORM", "PostgreSQL", "Redis", "Bun"],
    githubUrl: "https://github.com/Mufid2225/startover",
    featured: false,
    screenshots: [
      "/projects/startover/2markets.webp",
      "/projects/startover/3detail.webp",
      "/projects/startover/4insights.webp",
      "/projects/startover/5watchlist.webp",
    ],
  },
  {
    id: "project-10",
    title: "OLIVIA",
    description: "Asisten suara AI lokal (Local-First AI Voice Assistant) yang beroperasi sepenuhnya offline tanpa API cloud. Dilengkapi deteksi wake word kustom 'OLIVIA', sintesis suara neural bahasa Indonesia (Piper TTS), STT lokal (faster-whisper), memori jangka panjang SQLite FTS5, dan sistem keamanan 3-tier.",
    longDescription: "OLIVIA adalah asisten suara AI lokal yang mengutamakan privasi penuh pengguna dengan berjalan 100% di perangkat lokal tanpa bergantung pada layanan cloud eksternal. Sistem ini menggabungkan pipeline audio streaming (AudioWorklet & WebSocket), deteksi wake word kustom berbasis ONNX Runtime ('OLIVIA') dengan VAD pre-gating, transkripsi suara lokal menggunakan faster-whisper, penalaran LLM lokal via Ollama, sintesis suara neural bahasa Indonesia beresolusi tinggi dengan Piper TTS (id_ID-news_tts-medium), serta memori kontekstual jangka panjang berbasis SQLite FTS5 dengan importance decay dan permission sandbox 3-tier.",
    description_en: "Local-first AI Voice Assistant operating 100% offline without cloud APIs. Equipped with custom wake-word detection ('OLIVIA'), Indonesian neural voice synthesis (Piper TTS), local STT (faster-whisper), SQLite FTS5 long-term memory, and 3-tier sandbox security.",
    longDescription_en: "OLIVIA is a local-first AI voice assistant prioritizing complete user privacy by running 100% on local hardware without external cloud dependencies. The system integrates AudioWorklet & WebSocket streaming audio pipelines, custom ONNX Runtime wake-word detection with VAD pre-gating, local faster-whisper speech-to-text, local LLM inference via Ollama, high-resolution Indonesian neural voice synthesis with Piper TTS, and long-term contextual memory powered by SQLite FTS5 with importance decay and 3-tier permission sandboxing.",
    image: "/projects/olivia/1hero.webp",
    techStack: ["Next.js", "TypeScript", "Bun", "FastAPI", "Python", "ONNX Runtime", "Piper TTS", "SQLite", "Tailwind CSS", "Ollama"],
    githubUrl: "https://github.com/Mufid2225/olivia",
    featured: false,
    screenshots: [
      "/projects/olivia/2waking.webp",
      "/projects/olivia/3listening.webp",
    ],
  },
  {
    id: "project-11",
    title: "OPSIS",
    description: "Antarmuka AI Agent Operations Console bergaya mission-control untuk memantau armada autonomous AI agent, tugas, biaya token, dan kontrol intervensi.",
    longDescription: "OPSIS adalah eksperimen antarmuka produk lengkap (complete product interface) untuk konsol operasi AI agent. Terinspirasi dari ruang kendali aerospace dan terminal finansial profesional, OPSIS mencakup halaman Overview, manajemen fleet Agents beserta detail per-agent, pelacakan Tasks, shell navigasi Sidebar/Topbar responsif, dan sistem desain berbasis token Tailwind CSS v4 dengan data simulasi untuk prototyping UI.",
    description_en: "Mission-control style AI Agent Operations Console UI for monitoring autonomous AI agent fleets, tasks, token costs, and intervention controls.",
    longDescription_en: "OPSIS is a complete product interface design and frontend engineering project for an AI Agent Operations Console. Inspired by aerospace mission control and professional financial terminals, OPSIS covers Overview, Agent fleet management with per-agent drill-downs, Tasks tracking, responsive Sidebar/Topbar navigation, and a token-driven Tailwind CSS v4 design system backed by simulated operational data.",
    image: "/projects/opsis/1hero.webp",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    featured: false,
    screenshots: [
      "/projects/opsis/2agents.webp",
      "/projects/opsis/3agent-detail.webp",
    ],
  },
  {
    id: "project-12",
    title: "Kantor Agent Community",
    description: "Fork dari humaedihume/kantor-agent (MIT) yang dikembangkan menjadi varian community: kantor 3D three.js yang memvisualisasikan aktivitas AI coding agent dari transkrip lokal read-only, dengan dashboard Windows native tanpa WSL/Docker serta dukungan Claude Code, OpenCode, Kiro, Antigravity IDE, dan Hermes.",
    longDescription: "Kantor Agent memperlihatkan pekerjaan AI coding agent sebagai kantor kecil 3D (three.js): sesi utama menjadi ketua tim, subagent dikerjakan anggota tim, dan freelancer masuk saat tim penuh — semua digerakkan transkrip lokal nyata yang dibaca read-only dan terredaksi. Varian community ini adalah fork dari humaedihume/kantor-agent (MIT) dengan pengembangan utama: dashboard Windows native via launcher PowerShell (tanpa WSL/Docker, bind loopback + ACL Windows), adapter event OpenCode v2, adapter lokal read-only untuk Kiro, Antigravity IDE, dan Hermes, serta root dashboard multi-proyek. Kelengkapan lain: plugin Claude Code zero-config, server Node ≥18 atau PHP ≥8.1 tanpa dependensi npm/composer, tunnel cloudflared opsional, serta UI Bahasa Indonesia yang ramah ponsel dan menghormati prefers-reduced-motion.",
    description_en: "Community fork of humaedihume/kantor-agent (MIT): a three.js 3D office visualizing AI coding agent activity from read-only local transcripts, with a native Windows dashboard (no WSL/Docker) and support for Claude Code, OpenCode, Kiro, Antigravity IDE, and Hermes.",
    longDescription_en: "Kantor Agent renders AI coding agent work as a small 3D office (three.js): the main session leads the team, subagents are handled by teammates, and freelancers join when the team is full — all driven by real local transcripts read read-only and redacted. This community variant is a fork of humaedihume/kantor-agent (MIT) whose main development adds a native Windows dashboard via PowerShell launcher (no WSL/Docker, loopback bind + Windows ACL), an OpenCode v2 event adapter, read-only local adapters for Kiro, Antigravity IDE, and Hermes, plus a multi-project root dashboard. It also ships a zero-config Claude Code plugin, a dependency-free Node ≥18 or PHP ≥8.1 server, an optional cloudflared tunnel, and a mobile-friendly Bahasa Indonesia UI honoring prefers-reduced-motion.",
    image: "/projects/kantor-agent/1hero.webp",
    techStack: ["Three.js", "JavaScript", "Node.js", "PowerShell", "SQLite", "Claude Code Plugin"],
    githubUrl: "https://github.com/Mufid2225/kantor-agent-community",
    featured: false,
    screenshots: [
      "/projects/kantor-agent/2santai.webp",
      "/projects/kantor-agent/3freelancer.webp",
    ],
  },
  {
    id: "project-13",
    title: "OpenCode Workflow Companion",
    description: "Fork OpenCode v2 yang mengembangkan status line TUI dengan session summaries lintas sesi, reusable instructions, MCP recovery, inventaris tools, dan shortcut PowerShell per proyek.",
    longDescription: "OpenCode Workflow Companion adalah fork dari rashidrazak/opencode-status-line (MIT), yang awalnya menampilkan metrik status line live OpenCode seperti penggunaan context, cache, kecepatan streaming, biaya, durasi sesi, dan perubahan git. Fork ini menambahkan fitur workflow: membuat dan menelusuri rangkuman lintas sesi, menyimpan serta menerapkan instruksi reusable ke sesi dan subagent, mencoba pemulihan MCP yang gagal, melihat inventaris tools beserta estimasi token schema, serta membuka PowerShell pada direktori proyek aktif. UI TUI dapat dikonfigurasi, mendukung beberapa slot penempatan dan palette warna. Instalasi fork saat ini melalui checkout Git; README menyatakan nama paket npm yang diwarisi masih milik upstream.",
    description_en: "An OpenCode v2 fork extending a TUI status line with cross-session summaries, reusable instructions, MCP recovery, tool inventory, and per-project PowerShell shortcuts.",
    longDescription_en: "OpenCode Workflow Companion is a fork of rashidrazak/opencode-status-line (MIT), which originally displays live OpenCode status metrics such as context usage, cache, streaming speed, cost, session duration, and git changes. This fork adds workflow features: creating and browsing cross-session summaries, saving reusable instructions and applying them to sessions and subagents, retrying failed MCP connections, inspecting the tool inventory with estimated schema-token footprint, and opening PowerShell in the active project directory. The TUI is configurable, supports multiple placement slots, and includes color palettes. The fork is currently installed from a Git checkout; its README notes the inherited npm package name still belongs to upstream.",
    image: "/projects/opencode-status-line/1hero.webp",
    techStack: ["OpenCode Plugin", "TypeScript", "SolidJS", "OpenTUI", "Bun", "PowerShell"],
    githubUrl: "https://github.com/Mufid2225/opencode-workflow-companion",
    featured: false,
  },
];

export function getProjectContent(project: Project, language: "id" | "en") {
  return {
    title: project.title,
    description: language === "en" && project.description_en ? project.description_en : project.description,
    longDescription: language === "en" && project.longDescription_en ? project.longDescription_en : project.longDescription,
  };
}

export interface TechStackItem {
  name: string;
  src: string;
  row: 1 | 2;
}

export const techStackItems: TechStackItem[] = [
  { name: "Next.js", src: "/logo_carousel/nextjs.png", row: 1 },
  { name: "React", src: "/logo_carousel/react.png", row: 1 },
  { name: "TypeScript", src: "/logo_carousel/typescript.png", row: 1 },
  { name: "JavaScript", src: "/logo_carousel/js.png", row: 1 },
  { name: "Tailwind CSS", src: "/logo_carousel/tailwind.png", row: 1 },
  { name: "Electron", src: "/logo_carousel/electron.png", row: 1 },
  { name: "Python", src: "/logo_carousel/python.png", row: 1 },
  { name: "FastAPI", src: "/logo_carousel/fastapi.png", row: 1 },
  { name: "Bun", src: "/logo_carousel/bun.png", row: 1 },
  { name: "Node.js", src: "/logo_carousel/nodejs.png", row: 2 },
  { name: "PostgreSQL", src: "/logo_carousel/postgre.png", row: 2 },
  { name: "MySQL", src: "/logo_carousel/mysql.png", row: 2 },
  { name: "SQLite", src: "/logo_carousel/sqlite.png", row: 2 },
  { name: "Redis", src: "/logo_carousel/redis.png", row: 2 },
  { name: "Docker", src: "/logo_carousel/docker.png", row: 2 },
  { name: "Git", src: "/logo_carousel/git.png", row: 2 },
  { name: "Ollama", src: "/logo_carousel/ollama.png", row: 2 },
];

export const skills: string[] = techStackItems.map((item) => item.name);

export const socialLinks = {
  email: "mufidarhaburizky@gmail.com",
  github: "https://github.com/Mufid2225",
  instagram: "https://www.instagram.com/fidnotpid_",
  instagramUsername: "fidnotpid_",
  telegram: "https://t.me/1dleraa",
  telegramUsername: "1dleraa",
  spotify: "https://open.spotify.com/user/ukzr6gcxytbxxc6omkq7cw3yl",
  // Set to "/cv/cv-mufid.pdf" after placing your real CV PDF inside public/cv/
  cvUrl: null as string | null,
};
