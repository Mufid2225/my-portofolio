import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Profil, latar belakang pendidikan, pengalaman industri, sertifikat, dan tech stack Muhammad Mufid Arhaburrizky.",
};

export default function AboutPage() {
  return <AboutClient />;
}
