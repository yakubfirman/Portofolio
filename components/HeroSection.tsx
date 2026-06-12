import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal, faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { AvailabilityPill, Button } from "@/components/ui";
import type { Profile } from "@/lib/data";

export default function HeroSection({ profile }: { profile: Profile }) {
  // Split first_name at last space to apply accent to last word of first_name
  const nameParts = profile.first_name.split(" ");
  const nameStart = nameParts.slice(0, -1).join(" ");
  const nameAccent = nameParts[nameParts.length - 1];
  return (
    <section
      id="hero"
      className="relative -top-14 flex min-h-svh flex-col justify-center px-5 sm:-top-8 sm:px-8"
    >
      {/* Main layout */}
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* ── Left: text ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Role badge */}
            <div className="hero-animate hero-delay-2 mb-6 flex items-center justify-center gap-3 lg:justify-start">
              <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-red-300/60 sm:block" />
              <span className="flex items-center gap-2 rounded-full border border-red-100 bg-white/60 px-4 py-1.5 text-[10px] font-semibold tracking-widest text-red-600 uppercase backdrop-blur-sm">
                <FontAwesomeIcon icon={faTerminal} className="h-2.5 w-2.5" />
                {profile.role_badge}
              </span>
              <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-red-300/60 sm:block" />
            </div>

            {/* Name */}
            <h1 className="hero-animate hero-delay-3 font-display mb-6 text-[clamp(2.6rem,8.5vw,6rem)] leading-[0.9] font-black tracking-[-0.03em]">
              <span className="block text-slate-900">
                {nameStart && <>{nameStart} </>}
                <span className="gradient-text">{nameAccent}</span>
              </span>
              <span className="block text-slate-900">{profile.last_name}</span>
            </h1>

            {/* Tagline */}
            <p className="hero-animate hero-delay-4 mx-auto mb-8 max-w-sm text-sm leading-relaxed text-slate-500 sm:text-base lg:mx-0 lg:max-w-md">
              {profile.tagline}
            </p>

            {/* CTAs */}
            <div className="hero-animate hero-delay-5 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <Button href="#projects" className="w-full sm:w-auto">
                Lihat Proyek
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
              <Button
                href={profile.cv_url}
                download
                variant="outline"
                className="w-full sm:w-auto"
              >
                <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5 text-red-500" />
                Download CV
              </Button>
            </div>
          </div>

          {/* ── Right: terminal card (desktop only) ── */}
          <div className="hero-animate hero-delay-3 hidden w-85 shrink-0 lg:block">
            {/* Outer glow */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-200/40 via-transparent to-transparent blur-sm" />
              <div className="overflow-hidden rounded-2xl border border-red-100/60 bg-white/70 shadow-2xl shadow-red-100/30 backdrop-blur-sm">
                {/* Title bar */}
                <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-auto font-mono text-[10px] text-slate-500">
                    yakub.config.ts
                  </span>
                </div>

                {/* Code content */}
                <div className="p-5 font-mono text-[11px] leading-[1.9]">
                  <p className="text-slate-400">{"// developer profile"}</p>
                  <p className="mt-1">
                    <span className="text-red-600">const </span>
                    <span className="text-slate-800">developer</span>
                    <span className="text-slate-400"> = {"{"}</span>
                  </p>
                  <div className="pl-4">
                    <p>
                      <span className="text-red-500">name</span>
                      <span className="text-slate-400">: </span>
                      <span className="text-emerald-600">&quot;{profile.first_name} {profile.last_name}.&quot;</span>
                      <span className="text-slate-400">,</span>
                    </p>
                    <p>
                      <span className="text-red-500">role</span>
                      <span className="text-slate-400">: </span>
                      <span className="text-emerald-600">&quot;Full Stack Web Dev & SEO Specialist&quot;</span>
                      <span className="text-slate-400">,</span>
                    </p>
                    <p>
                      <span className="text-red-500">location</span>
                      <span className="text-slate-400">: </span>
                      <span className="text-emerald-600">&quot;Surakarta, Indonesia&quot;</span>
                      <span className="text-slate-400">,</span>
                    </p>
                    <p>
                      <span className="text-red-500">available</span>
                      <span className="text-slate-400">: </span>
                      <span className="text-blue-600">true</span>
                      <span className="text-slate-400">,</span>
                    </p>
                    <p>
                      <span className="text-red-500">stack</span>
                      <span className="text-slate-400">: [</span>
                    </p>
                    <div className="pl-4">
                      <p>
                        <span className="text-emerald-600">&quot;Next.js&quot;</span>
                        <span className="text-slate-400">,</span>
                      </p>
                      <p>
                        <span className="text-emerald-600">&quot;Laravel&quot;</span>
                        <span className="text-slate-400">,</span>
                      </p>
                      <p>
                        <span className="text-emerald-600">&quot;TypeScript&quot;</span>
                        <span className="text-slate-400">,</span>
                      </p>
                    </div>
                    <p>
                      <span className="text-slate-400">],</span>
                    </p>
                  </div>
                  <p>
                    <span className="text-slate-400">{"}"}</span>
                  </p>
                  <p className="mt-3 flex items-center gap-1.5 text-slate-400">
                    <span className="text-red-500/80">$</span>
                    <span className="cursor-blink inline-block h-3.5 w-0.5 bg-red-500/70" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
