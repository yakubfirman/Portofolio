"use client";

import { useState, useTransition } from "react";
import { submitTestimonial } from "@/lib/data";

export default function TestimonialFormClient() {
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    message: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", preset || "");

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error?.message || "Upload gagal");

      setFormData((prev) => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal upload foto. Coba lagi.");
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.name.trim() || !formData.role.trim() || !formData.message.trim()) {
      setError("Nama, peran, dan testimoni harus diisi");
      return;
    }

    startTransition(async () => {
      try {
        await submitTestimonial({
          name: formData.name,
          role: formData.role,
          company: formData.company || undefined,
          message: formData.message,
          image: formData.image || undefined,
        });
        setSuccess(true);
        setFormData({ name: "", role: "", company: "", message: "", image: "" });
        setTimeout(() => setSuccess(false), 5000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal mengirim testimoni");
      }
    });
  }

  const inputCls =
    "w-full rounded-xl border border-red-100/60 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all duration-200";
  const labelCls = "mb-2 block text-[11px] font-bold tracking-widest text-slate-500 uppercase";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Nama Lengkap *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama Anda"
            className={inputCls}
            required
          />
        </div>
        <div>
          <label className={labelCls}>Peran / Posisi *</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Contoh: CEO, Developer, Designer"
            className={inputCls}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Perusahaan / Organisasi</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nama perusahaan (opsional)"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Foto Profil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className={`${inputCls} cursor-pointer p-2.5 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-red-50 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-red-600 hover:file:bg-red-100`}
          />
          {uploading && <p className="mt-1.5 text-xs text-slate-500">⏳ Uploading...</p>}
          {formData.image && (
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-100/60 bg-emerald-50/30 p-2">
              <img
                src={formData.image}
                alt="Preview"
                className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-emerald-100"
              />
              <p className="text-xs font-medium text-emerald-600">✓ Foto berhasil diunggah</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className={labelCls}>Testimoni Anda *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Bagikan pengalaman Anda bekerja dengan saya..."
          rows={5}
          className={`${inputCls} resize-y`}
          required
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200/80 bg-red-50/50 p-4 text-sm text-red-600">
          <p className="font-semibold">Terjadi Kesalahan</p>
          <p className="mt-1 text-xs opacity-90">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 text-sm text-emerald-600">
          <p className="font-semibold">✓ Testimoni Berhasil Dikirim!</p>
          <p className="mt-1 text-xs opacity-90">
            Terima kasih. Testimoni Anda akan ditampilkan setelah disetujui.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending || uploading}
        className="group w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all hover:shadow-xl hover:shadow-red-500/30 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 disabled:pointer-events-none disabled:opacity-50"
      >
        {pending ? "Mengirim..." : uploading ? "Upload foto..." : "Kirim Testimoni"}
      </button>
    </form>
  );
}
