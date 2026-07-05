export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  screenshots?: string[];
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "SiPena",
    description: "Sistem Perizinan Akademik yang dirancang untuk memenuhi kebutuhan berbagai macam perizinan surat menyurat menggunakan platform digital",
    longDescription: "Sistem Perizinan Akademik yang dirancang untuk memenuhi kebutuhan berbagai macam perizinan surat menyurat menggunakan platform digital",
    image: "/sipena.webp",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Go", "Gin", "MariaDB", "Redis"],
    liveUrl: "https://www.sipena-smkn2.dedyn.io/",
    githubUrl: "https://github.com/e-letter/e-letter-web",
    featured: true,
    screenshots: [
      "/login-siswa.webp",
      "/home-siswa.webp",
      "/daftar-siswa.webp",
      "/masuk-siswa.webp",
      "/keluar-siswa.webp",
      "/notif-siswa.webp",
      "/otp-siswa.webp",
      "/panduan1-siswa.webp",
      "/panduan2-siswa.webp",
      "/profil-siswa.webp",
      "/riwayat-siswa.webp",
      "/log-siswa.webp",
    ],
  },
  {
    id: "project-2",
    title: "RuangTeduh",
    description: "Neo-brutalism coffee shop discovery web app yang membantu menemukan tempat ngopi berdasarkan suasana, mood, dan pengalaman emosional",
    longDescription: "Neo-brutalism coffee shop discovery web app yang membantu menemukan tempat ngopi berdasarkan suasana, mood, dan pengalaman emosional",
    image: "/home-ruang.webp",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    githubUrl: "https://github.com/Mufid2225/ruangteduh",
    liveUrl: undefined,
    featured: true,
    screenshots: [
      "/coffe-ruang.webp",
      "/dashboard-ruang.webp",
      "/detail2-ruang.webp",
      "/favorite-ruang.webp",
    ],
  },
  {
    id: "project-3",
    title: "9Router",
    description: "FREE AI Router & Token Saver — single OpenAI-compatible endpoint untuk routing ke 40+ AI provider dengan smart fallback dan kompresi token, dihosting via Hugging Face",
    longDescription: "FREE AI Router & Token Saver — single OpenAI-compatible endpoint untuk routing ke 40+ AI provider dengan smart fallback dan kompresi token, dihosting via Hugging Face",
    image: "/1login-router.webp",
    techStack: ["Next.js", "React", "Tailwind CSS", "SQLite", "Express"],
    screenshots: [
      "/2home-router.webp",
      "/3provider-router.webp",
      "/4model-router.webp",
      "/5usage-router.webp",
    ],
    liveUrl: "https://neriss4-9router-database-demo.hf.space/",
    githubUrl: "https://huggingface.co/spaces/Neriss4/9router-database-demo/tree/main",
    featured: true,
  },
];

export const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Tailwind CSS",
  "Git",
];

export const socialLinks = {
  email: "mufidarhaburizky08@gmail.com",
  github: "https://github.com/Mufid2225",
  instagram: "https://www.instagram.com/fidnotpid_?igsh=MTNtdXlnZ3Q4MTZ6dQ==",
  instagramUsername: "@fidnotpid_",
  telegram: "https://t.me/liltrustcorner",
  telegramUsername: "1dleraa",
};
