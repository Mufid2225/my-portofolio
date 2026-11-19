import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image.endsWith(".svg") ? undefined : [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
