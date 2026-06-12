import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import type { Project } from "@/lib/data/projects";
import Button from "./Button";
import RoleBadge from "./RoleBadge";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-red-100/60 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-red-200 hover:shadow-2xl hover:shadow-red-100/40">
      {/* Hover glow */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-red-400/0 blur-[60px] transition-all duration-500 group-hover:bg-red-400/10" />

      {/* ── Screenshot ── */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Lihat detail proyek ${project.name}`}
        className="relative block aspect-video w-full overflow-hidden bg-slate-50"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot ${project.name}`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-50 to-rose-50">
            <span className="text-5xl font-black text-red-200 select-none">
              {project.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/60 to-transparent" />
      </Link>

      {/* ── Content ── */}
      <div className="relative flex flex-1 flex-col px-5 pt-4 pb-5">
        <div className="mb-2">
          <RoleBadge role={project.details.role} />
        </div>

        <h3 className="mb-2 line-clamp-2 leading-snug font-bold text-slate-900">{project.name}</h3>

        <p className="mb-auto line-clamp-2 text-xs leading-relaxed text-slate-500">
          {project.description}
        </p>

        {/* ── Action buttons ── */}
        <div className="mt-4 flex gap-2 border-t border-red-100/60 pt-4">
          <Button
            href={`/projects/${project.slug}`}
            variant="outline"
            size="sm"
            className="flex-1 justify-center gap-1.5 px-2 py-1.5 text-[11px] sm:gap-2 sm:px-3 sm:py-2 sm:text-xs"
          >
            <FontAwesomeIcon icon={faBookOpen} className="h-3 w-3 shrink-0" />
            Lihat Detail
          </Button>
          <Button
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            className="flex-1 justify-center gap-1.5 px-2 py-1.5 text-[11px] sm:gap-2 sm:px-3 sm:py-2 sm:text-xs"
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3 shrink-0" />
            Lihat Live
          </Button>
        </div>
      </div>
    </div>
  );
}
