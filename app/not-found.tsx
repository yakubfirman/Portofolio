import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan | Yakub Firman Mustofa",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-white px-5 text-center">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/50 blur-[120px]" />

      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(220,38,38,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative">
        {/* Big 404 */}
        <p className="mb-3 text-8xl font-black tracking-tighter sm:text-9xl">
          <span className="gradient-text">4</span>
          <span className="text-slate-200">0</span>
          <span className="gradient-text">4</span>
        </p>

        <p className="mb-2 font-mono text-sm font-semibold uppercase tracking-widest text-red-500/70">
          Halaman Tidak Ditemukan
        </p>

        <p className="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-slate-500">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan. Kembali ke beranda untuk melanjutkan.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:shadow-xl hover:shadow-red-500/30 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
