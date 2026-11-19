import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Kumpulan project web, aplikasi desktop Electron, sistem akademik, bot AI, dan platform eksperimental yang dibangun Muhammad Mufid Arhaburrizky.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
