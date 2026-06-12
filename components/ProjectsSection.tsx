import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Project } from "@/lib/data/projects";
import { SectionHeading, ProjectCard, Reveal, Button } from "@/components/ui";

type Props = { projects: Project[] };

export default function ProjectsSection({ projects }: Props) {
  return (
    <section id="projects" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Portfolio" title="Proyek Pilihan" />
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2">
          {projects.slice(0, 4).map((project, index) => (
            <Reveal key={project.slug} delay={index * 80} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={350}>
          <div className="mt-14 flex justify-center">
            <Button href="/projects" variant="outline" className="gap-2.5">
              Lihat Semua Proyek
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
