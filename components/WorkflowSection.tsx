import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPenRuler,
  faCode,
  faMagnifyingGlassChart,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { SectionHeading, Reveal } from "@/components/ui";

const STEPS = [
  {
    icon: faComments,
    number: "01",
    title: "Discovery",
    description:
      "Memahami kebutuhan, tujuan bisnis, dan target pengguna melalui diskusi mendalam sebelum satu baris kode pun ditulis.",
  },
  {
    icon: faPenRuler,
    number: "02",
    title: "Planning & Design",
    description:
      "Merancang struktur halaman, alur navigasi, dan tampilan visual agar selaras dengan identitas brand dan pengalaman pengguna.",
  },
  {
    icon: faCode,
    number: "03",
    title: "Development",
    description:
      "Membangun website dengan kode yang bersih, performa tinggi, dan arsitektur yang mudah dipelihara menggunakan stack modern.",
  },
  {
    icon: faMagnifyingGlassChart,
    number: "04",
    title: "SEO Optimization",
    description:
      "Mengoptimalkan struktur teknis, metadata, kecepatan halaman, dan konten agar mudah ditemukan dan diindeks oleh Google.",
  },
  {
    icon: faRocket,
    number: "05",
    title: "Deployment",
    description:
      "Meluncurkan website ke server produksi, memastikan semua berjalan sempurna, lalu mendaftarkan ke Google Search Console.",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading tag="How I Work" title="Cara Saya Bekerja" />
        </Reveal>

        <Reveal delay={60}>
          <p className="-mt-8 mb-14 max-w-xl text-sm leading-relaxed text-slate-500">
            Setiap proyek dijalani dengan alur kerja yang terstruktur — dari pemahaman kebutuhan
            hingga peluncuran — sehingga hasilnya dapat diprediksi dan tepat sasaran.
          </p>
        </Reveal>

        {/* Steps — horizontal grid */}
        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div className="pointer-events-none absolute top-10 left-0 hidden h-px w-full bg-gradient-to-r from-transparent via-red-200/60 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 80}>
                <div className="group relative flex h-full flex-col items-center rounded-2xl border border-red-100/60 bg-white/70 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-50/50">
                  {/* Step icon */}
                  <div className="relative mb-4 shrink-0">
                    <div className="absolute inset-0 rounded-xl bg-red-100/30 blur-md transition-all duration-300 group-hover:bg-red-200/40 group-hover:blur-lg" />
                    <div className="relative flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-rose-50 ring-1 ring-red-100/80 transition-all duration-300 group-hover:ring-red-200">
                      <FontAwesomeIcon
                        icon={step.icon}
                        className="h-5 w-5 text-red-500 transition-colors duration-300 group-hover:text-red-600"
                      />
                    </div>
                  </div>

                  {/* Number */}
                  <span className="mb-1.5 font-mono text-[10px] font-bold tracking-widest text-red-400/70">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="mb-2 text-[13px] leading-snug font-bold text-slate-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[12px] leading-relaxed text-slate-500">{step.description}</p>

                  {/* Bottom accent */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-red-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
