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
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project 1",
    description: "Deskripsi singkat project 1",
    longDescription: "Penjelasan detail tentang project 1, tantangan yang dihadapi, dan solusi yang diterapkan.",
    image: "/placeholder.svg",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "project-2",
    title: "Project 2",
    description: "Deskripsi singkat project 2",
    longDescription: "Penjelasan detail tentang project 2, tantangan yang dihadapi, dan solusi yang diterapkan.",
    image: "/placeholder.svg",
    techStack: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "project-3",
    title: "Project 3",
    description: "Deskripsi singkat project 3",
    longDescription: "Penjelasan detail tentang project 3, tantangan yang dihadapi, dan solusi yang diterapkan.",
    image: "/placeholder.svg",
    techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "project-4",
    title: "Project 4",
    description: "Deskripsi singkat project 4",
    longDescription: "Penjelasan detail tentang project 4, tantangan yang dihadapi, dan solusi yang diterapkan.",
    image: "/placeholder.svg",
    techStack: ["Next.js", "Prisma", "MySQL"],
    featured: false,
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
};
