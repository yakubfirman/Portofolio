import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowRight,
  faMapPin,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import type { Social } from "@/lib/data";
import { SectionHeading, AvailabilityPill, Reveal } from "@/components/ui";

type Props = { socials: Social[] };

export default function ContactSection({ socials }: Props) {
  return (
    <section id="contact" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="Get In Touch" title="Mari Berkolaborasi" />
        </Reveal>

        <div className="grid items-start gap-10 md:grid-cols-5 md:gap-14">
          {/* ── Left: headline + CTA ── */}
          <Reveal delay={100} className="md:col-span-3">
            <div className="flex flex-col gap-6">
              <div>
                <AvailabilityPill text="Open to Work" />
              </div>

              <p className="text-sm leading-relaxed text-slate-500">
                Saya terbuka untuk proyek freelance, kolaborasi kreatif, maupun peluang kerja penuh
                waktu. Hubungi lewat email atau media sosial — saya akan membalas secepatnya.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="mailto:yakubfirmanmustofa@gmail.com"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5 shrink-0" />
                  Kirim Email
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5"
                  />
                </a>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <FontAwesomeIcon icon={faMapPin} className="h-3 w-3 text-red-400" />
                  Surakarta, Jawa Tengah — Indonesia
                </span>
              </div>
            </div>
          </Reveal>

          {/* ── Right: social links ── */}
          <Reveal delay={200} className="md:col-span-2">
            <p className="mb-4 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Temukan saya di
            </p>
            <div className="flex flex-col gap-1">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (buka di tab baru)`}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition-all hover:bg-red-50/60 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                >
                  <FontAwesomeIcon
                    icon={icon}
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 text-red-400/70 transition-colors group-hover:text-red-500"
                  />
                  <span className="flex-1 text-xs">{label}</span>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-50"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
