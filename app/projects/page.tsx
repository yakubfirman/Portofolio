import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { getProjects, getSocials, getProfile } from "@/lib/data";
import { Navbar, Footer } from "@/components";
import { Button, SectionHeading, Reveal, PageBackground, ProjectCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Proyek",
  description:
    "Kumpulan proyek web yang telah dikerjakan oleh Yakub Firman Mustofa — mulai dari aplikasi e-voting, website organisasi, hingga magang di instansi pemerintah.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Proyek — Yakub Firman Mustofa",
    description: "Kumpulan proyek web yang telah dikerjakan oleh Yakub Firman Mustofa — mulai dari aplikasi e-voting, website organisasi, hingga magang di instansi pemerintah.",
    url: "https://yakubfirman.id/projects",
  },
};

export default async function ProjectsPage() {
  const [projects, socials, profile] = await Promise.all([getProjects(), getSocials(), getProfile()]);

  return (
    <div className="relative min-h-screen bg-white">
      <PageBackground />

      <Navbar profile={profile} />

      <main className="relative z-10 px-5 pt-5 pb-28 sm:px-8 md:pt-10">
        <div className="mx-auto max-w-5xl">
          {/* ── Page header ── */}
          <div className="hero-animate hero-delay-2">
            <SectionHeading tag="Portfolio" title="Semua Proyek" />
            <p className="-mt-8 mb-12 max-w-xl text-sm leading-relaxed text-slate-500 sm:mb-16">
              Kumpulan proyek yang telah saya kerjakan — dari pengembangan aplikasi web, pembuatan
              website organisasi, hingga pengalaman magang di instansi pemerintah.
            </p>
          </div>

          {/* ── Projects grid ── */}
          <div className="grid gap-7 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 80} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          {/* ── GitHub CTA ── */}
          <Reveal delay={projects.length * 80}>
            <div className="mt-14 flex justify-center">
              <a
                href={socials.find((s) => s.label.toLowerCase() === "github")?.href ?? "https://github.com/yakubfirman"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-red-200/80 bg-white/60 px-6 py-3 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-all duration-300 hover:border-red-300 hover:bg-red-50/60 hover:text-slate-900 hover:shadow-lg hover:shadow-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
              >
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                Lihat Repository GitHub
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer socials={socials} profile={profile} />
    </div>
  );
}
