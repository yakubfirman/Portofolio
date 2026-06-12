import type { Metadata } from "next";
import {
  getProfile,
  getSocials,
  getAbout,
  getSpeaking,
  getProjects,
  getSkillCategories,
  getAllTestimonials,
} from "@/lib/data";
import { PageBackground, Reveal } from "@/components/ui";
import {
  Navbar,
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  SpeakingSection,
  TestimonialsSection,
  WorkflowSection,
  ContactSection,
  Footer,
  GitHubSection,
} from "@/components";

export const metadata: Metadata = {
  title: "Yakub Firman Mustofa — Full Stack Web Developer & SEO Specialist",
  description:
    "Portofolio Yakub Firman Mustofa — Full Stack Web Developer dan SEO Specialist yang berfokus pada membangun produk digital berkualitas dan optimasi SEO.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yakub Firman Mustofa — Full Stack Web Developer & SEO Specialist",
    description:
      "Portofolio Yakub Firman Mustofa — Full Stack Web Developer dan SEO Specialist yang berfokus pada membangun produk digital berkualitas dan optimasi SEO.",
    url: "https://yakubfirman.id",
  },
};

export default async function Home() {
  const [profile, socials, about, events, projects, skillCategories, testimonials] =
    await Promise.all([
      getProfile(),
      getSocials(),
      getAbout(),
      getSpeaking(),
      getProjects(),
      getSkillCategories(),
      getAllTestimonials(),
    ]);

  return (
    <div className="relative min-h-screen bg-white">
      <PageBackground />

      <Navbar profile={profile} />

      <main className="relative z-10">
        <HeroSection profile={profile} />

        {/* Section divider */}
        <div className="section-divider" />

        <AboutSection
          meta={about.meta}
          education={about.education}
          highlights={about.highlights}
        />

        <div className="section-divider" />

        <SkillsSection categories={skillCategories} />

        <div className="section-divider" />

        <ProjectsSection projects={projects} />

        <div className="section-divider" />

        <SpeakingSection events={events} />

        <div className="section-divider" />

        <TestimonialsSection testimonials={testimonials} />

        <div className="section-divider" />

        <WorkflowSection />

        <div className="section-divider" />

        <GitHubSection />

        <div className="section-divider" />

        <ContactSection socials={socials} />
      </main>

      <Footer socials={socials} profile={profile} />
    </div>
  );
}
