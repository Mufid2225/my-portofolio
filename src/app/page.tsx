import HeroSection from "@/components/features/HeroSection";
import FeaturedProjects from "@/components/features/FeaturedProjects";
import SkillsSection from "@/components/features/SkillsSection";
import ContactSection from "@/components/features/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
