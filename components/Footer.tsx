import { NAV_LINKS } from "@/lib/data";
import type { Social, Profile } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/ui";

type Props = { socials: Social[]; profile: Profile; location?: string };

export default function Footer({ socials, profile, location }: Props) {
  const nameParts = profile.first_name.trim().split(" ");
  const nameAccent = nameParts.pop() ?? "";
  const nameStart = nameParts.join(" ");
  const fullName = `${profile.first_name} ${profile.last_name}`.trim();
  return (
    <footer className="relative overflow-hidden border-t border-red-100/60 bg-gradient-to-b from-white to-rose-50/30">
      {/* ── Top gradient line ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
      {/* ── Decorative glows ── */}
      <div className="pointer-events-none absolute -top-24 -left-40 h-80 w-80 rounded-full bg-red-100/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-rose-100/20 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        {/* ── Middle: Links grid ── */}
        <Reveal delay={80}>
          <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-3">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <p className="mb-0.5 text-2xl font-black tracking-tight text-slate-900">
                {nameStart}{nameStart ? " " : ""}<span className="gradient-text">{nameAccent} </span>{profile.last_name}
              </p>
              <p className="mb-5 text-[11px] font-medium text-slate-500">yakubfirman.id</p>
              <p className="text-xs leading-relaxed text-slate-500">
                {profile.role_badge}
              </p>
              {location && (
                <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <FontAwesomeIcon
                    icon={faMapPin}
                    className="h-2.5 w-2.5 text-red-400"
                    aria-hidden="true"
                  />
                  {location}
                </p>
              )}
            </div>

            {/* Nav */}
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                Navigasi
              </p>
              <nav className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    <span className="h-px w-0 bg-red-400/70 transition-all duration-200 group-hover:w-3" />
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
                Sosial Media
              </p>
              <div className="flex flex-col gap-2.5">
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (buka di tab baru)`}
                    className="group flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="h-3 w-3 shrink-0 text-slate-400 transition-colors group-hover:text-red-500"
                      aria-hidden="true"
                    />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Bottom bar ── */}
        <Reveal delay={130}>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-red-100/40 py-6 sm:flex-row">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} {fullName}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#hero"
                aria-label="Kembali ke atas"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-slate-500 backdrop-blur-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70"
              >
                <FontAwesomeIcon icon={faArrowUp} className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
