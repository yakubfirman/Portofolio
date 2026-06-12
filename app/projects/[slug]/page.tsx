import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faCircleCheck,
  faBriefcase,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { getProjectBySlug, getProjectSlugs, getSocials, getProfile } from "@/lib/data";
import { Navbar, Footer } from "@/components";
import { Reveal, PageBackground, TechBadge } from "@/components/ui";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.details.overview || project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name} — Yakub Firman Mustofa`,
      description: project.details.overview || project.description,
      url: `https://yakubfirman.id/projects/${slug}`,
      images: project.image ? [{ url: project.image, alt: project.name }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, socials, profile] = await Promise.all([getProjectBySlug(slug), getSocials(), getProfile()]);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.details.overview || project.description,
    url: project.url,
    applicationCategory: "WebApplication",
    author: {
      "@type": "Person",
      name: "Yakub Firman Mustofa",
      url: "https://yakubfirman.id",
    },
    ...(project.image && { image: project.image }),
    keywords: project.tech.join(", "),
  };

  return (
    <div className="relative min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageBackground />
      <Navbar profile={profile} />

      <main className="relative z-10 px-5 pt-5 pb-28 sm:px-8 md:pt-10">
        <div className="mx-auto max-w-5xl">
          {/* ── Back button ── */}
          <div className="hero-animate hero-delay-1 mb-8">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
              />
              Kembali ke Semua Proyek
            </Link>
          </div>

          {/* ── Hero image ── */}
          <div className="hero-animate hero-delay-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-red-100/60 bg-white shadow-2xl shadow-red-100/20">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`Screenshot ${project.name}`}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-50 to-rose-50">
                  <span className="text-8xl font-black text-red-200 select-none">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}
              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent" />
              {/* Top-left badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-red-200/60 bg-white/80 px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-red-600/80 uppercase backdrop-blur-sm">
                  <FontAwesomeIcon icon={faBriefcase} className="h-2.5 w-2.5" />
                  {project.details.role}
                </span>
              </div>
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_18rem] lg:gap-14">
            {/* ── LEFT: main content ── */}
            <div>
              {/* Title */}
              <div className="hero-animate hero-delay-3">
                <h1 className="font-display mb-4 text-2xl leading-tight font-black text-slate-900 sm:text-3xl lg:text-4xl">
                  {project.name}
                </h1>
                <p className="text-sm leading-relaxed text-slate-500">{project.description}</p>
              </div>

              {/* Divider */}
              <Reveal delay={200}>
                <div className="my-8 h-px bg-gradient-to-r from-red-200/60 via-red-100/30 to-transparent" />
              </Reveal>

              {/* Overview */}
              <Reveal delay={240}>
                <section>
                  <div className="mb-4 flex items-center gap-2.5">
                    <span className="h-1 w-1 rounded-full bg-red-500" />
                    <h2 className="text-[11px] font-bold tracking-[0.2em] text-red-500 uppercase">
                      Overview
                    </h2>
                    <span className="h-px w-6 bg-gradient-to-r from-red-300/60 to-transparent" />
                  </div>
                  <p className="text-sm leading-[1.85] text-slate-600">{project.details.overview}</p>
                </section>
              </Reveal>

              {/* Divider */}
              <Reveal delay={300}>
                <div className="my-8 h-px bg-gradient-to-r from-red-200/60 via-red-100/30 to-transparent" />
              </Reveal>

              {/* Contributions */}
              <Reveal delay={340}>
                <section>
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="h-1 w-1 rounded-full bg-red-500" />
                    <h2 className="text-[11px] font-bold tracking-[0.2em] text-red-500 uppercase">
                      Yang Saya Lakukan
                    </h2>
                    <span className="h-px w-6 bg-gradient-to-r from-red-300/60 to-transparent" />
                  </div>
                  <ul className="space-y-3">
                    {project.details.contributions.map((item, i) => (
                      <li
                        key={i}
                        className="group flex items-start gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-red-100/60 hover:bg-red-50/40"
                      >
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          className="mt-0.5 h-4 w-4 shrink-0 text-red-500 transition-colors duration-200 group-hover:text-red-600"
                        />
                        <span className="text-sm leading-relaxed text-slate-600 group-hover:text-slate-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {/* CTA */}
              <Reveal delay={420}>
                <div className="mt-10 flex flex-wrap gap-3">
                  {project.url !== "/" && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:shadow-xl hover:shadow-red-500/30 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
                      Lihat Proyek Live
                    </a>
                  )}
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2.5 rounded-xl border border-red-200/80 bg-white/60 px-5 py-2.5 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-all hover:border-red-300 hover:bg-red-50/60 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                    />
                    Proyek Lainnya
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT: sticky sidebar ── */}
            <Reveal delay={180}>
              <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
                {/* Role card */}
                <div className="rounded-2xl border border-red-100/60 bg-white/70 p-5 backdrop-blur-sm">
                  <p className="mb-1.5 font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    Role
                  </p>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBriefcase} className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-sm font-semibold text-slate-900">{project.details.role}</span>
                  </div>
                </div>

                {/* Tech stack card */}
                <div className="rounded-2xl border border-red-100/60 bg-white/70 p-5 backdrop-blur-sm">
                  <p className="mb-3 font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechBadge key={t} label={t} size="sm" />
                    ))}
                  </div>
                </div>

                {/* Live link card */}
                {project.url !== "/" && (
                  <div className="rounded-2xl border border-red-100/60 bg-white/70 p-5 backdrop-blur-sm">
                    <p className="mb-3 font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                      Live URL
                    </p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-red-600"
                    >
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="h-3 w-3 shrink-0 text-red-400/60 transition-colors group-hover:text-red-500"
                      />
                      <span className="truncate">{project.url.replace("https://", "")}</span>
                    </a>
                  </div>
                )}

                {/* Stats */}
                <div className="rounded-2xl border border-red-100/60 bg-white/70 p-5 backdrop-blur-sm">
                  <p className="mb-3 font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    Kontribusi
                  </p>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faLayerGroup} className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-sm text-slate-600">
                      <span className="font-bold text-slate-900">
                        {project.details.contributions.length}
                      </span>{" "}
                      poin kontribusi
                    </span>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer socials={socials} profile={profile} />
    </div>
  );
}
