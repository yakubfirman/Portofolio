import { Metadata } from "next";
import { getProfile, getSocials } from "@/lib/data";
import { Navbar, Footer } from "@/components";
import { Reveal, PageBackground, SectionHeading } from "@/components/ui";
import TestimonialFormClient from "./TestimonialFormClient";

export const metadata: Metadata = {
  title: "Kirim Testimoni",
  description:
    "Bagikan pengalaman Anda bekerja dengan Yakub Firman Mustofa. Testimoni akan membantu profesional lain mengenal kualitas pekerjaan saya.",
  alternates: { canonical: "/testimonial" },
};

export default async function TestimonialPage() {
  const [profile, socials] = await Promise.all([getProfile(), getSocials()]);

  return (
    <div className="relative min-h-screen bg-white">
      <PageBackground />
      <Navbar profile={profile} />

      <main className="relative z-10 px-5 pt-5 pb-28 sm:px-8 md:pt-10">
        <div className="mx-auto max-w-5xl">
          {/* Header section */}
          <div className="hero-animate hero-delay-2">
            <SectionHeading tag="Feedback Klien" title="Bagikan Testimoni Anda" />
            <p className="-mt-8 mb-12 max-w-xl text-sm leading-relaxed text-slate-500 sm:mb-16">
              Terima kasih telah bekerja sama. Testimoni Anda sangat berarti dan membantu
              profesional lain untuk mengenal kualitas pekerjaan saya. Silakan isi form di bawah ini
              tanpa perlu login.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
            {/* Form section */}
            <Reveal delay={80}>
              <div className="rounded-2xl border border-red-100/60 bg-white/70 p-6 backdrop-blur-sm sm:p-10">
                <TestimonialFormClient />
              </div>
            </Reveal>

            {/* Info box sidebar */}
            <Reveal delay={160}>
              <aside className="lg:sticky lg:top-24">
                <div className="rounded-2xl border border-red-100/60 bg-white/70 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-red-50 to-rose-50 text-red-500 ring-1 ring-red-100">
                      💡
                    </span>
                    Informasi Penting
                  </h3>
                  <ul className="flex flex-col gap-3 text-xs leading-relaxed text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/50" />
                      Testimoni Anda akan dimoderasi sebelum ditampilkan di website.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/50" />
                      Mohon berikan testimoni yang jujur dan konstruktif.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/50" />
                      URL foto profil bersifat opsional (pasang foto profesional untuk hasil
                      terbaik).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/50" />
                      Testimoni akan ditampilkan secara publik dengan nama dan posisi Anda.
                    </li>
                  </ul>
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
