import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";
import type { AboutMeta, AboutEducation, AboutHighlight } from "@/lib/data";

type Props = {
  meta: AboutMeta[];
  education: AboutEducation[];
  highlights: AboutHighlight[];
};

export default function AboutSection({ meta, education, highlights }: Props) {
  return (
    <section id="about" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="About Me" title="Tentang Saya" />
        </Reveal>

        <div className="grid items-start gap-10 md:grid-cols-5 md:gap-14">
          {/* ── Left: Content ── */}
          <Reveal delay={120} className="md:col-span-3">
            <div className="flex flex-col gap-7">
              {/* Bio */}
              <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                <p>
                  Saya adalah seorang{" "}
                  <span className="font-semibold text-slate-900">Full Stack Web Developer</span> dan{" "}
                  <span className="font-semibold text-slate-900">SEO Specialist</span> yang membangun
                  produk digital dari sisi frontend hingga backend — sekaligus memastikan setiap
                  produk mudah ditemukan mesin pencari melalui strategi SEO yang terstruktur.
                </p>
                <p>
                  Selama lebih dari <span className="font-semibold text-slate-900">2 tahun</span>{" "}
                  berkecimpung di dunia <span className="font-semibold text-slate-900">freelance</span>,
                  saya telah membangun berbagai proyek web — mulai dari landing page, aplikasi web
                  dinamis, hingga optimasi mesin pencari untuk berbagai klien.
                </p>
              </div>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2">
                {meta.map(({ icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-2 rounded-lg border border-red-100/80 bg-white/60 px-3.5 py-2 text-xs text-slate-600 backdrop-blur-sm transition-all duration-200 hover:border-red-200 hover:shadow-sm"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="h-3.5 w-3.5 shrink-0 text-red-500"
                      aria-hidden="true"
                    />
                    {text}
                  </span>
                ))}
              </div>

              {/* Education */}
              <div>
                <div className="flex flex-col gap-3">
                  {education.map((edu) => (
                    <div
                      key={edu.school}
                      className="flex items-start gap-3.5 rounded-xl border border-red-100/60 bg-white/60 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:border-red-200 hover:shadow-md hover:shadow-red-50"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-50 to-rose-50">
                        <FontAwesomeIcon
                          icon={edu.icon}
                          className="h-3.5 w-3.5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900">{edu.degree}</p>
                        <p className="text-xs text-slate-500">{edu.school}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="text-xs font-semibold text-red-600">{edu.year}</span>
                        {edu.note && (
                          <p className="flex items-center justify-end gap-1 text-[10px] text-slate-500">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="h-2.5 w-2.5 text-amber-500/70"
                            />
                            {edu.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link to full About page */}
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-red-600"
              >
                Lihat riwayat lengkap
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>

          {/* ── Right: Photo card ── */}
          <Reveal delay={50} className="order-first md:order-last md:col-span-2">
            <div className="relative mx-auto max-w-55 sm:max-w-xs lg:max-w-57.5 xl:max-w-62.5">
              {/* Glow ring */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-red-100/50 via-transparent to-rose-100/30 blur-2xl"
              />

              {/* Photo */}
              <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-red-100/60 bg-white shadow-xl shadow-red-100/20">
                <Image
                  src="/photo.png"
                  alt="Yakub Firman Mustofa"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                  priority
                />
                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white/95 via-white/60 to-transparent" />

                {/* Name + status overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm font-bold text-slate-900">Yakub Firman Mustofa</p>
                  <p className="mt-0.5 text-[11px] font-medium text-red-600">
                    Full Stack Dev &amp; SEO Specialist
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[11px] text-slate-600">Open to Work</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
