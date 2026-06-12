"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/ui";
import type { Testimonial } from "@/lib/data";

type Props = { testimonials: Testimonial[] };

export default function TestimonialsCarousel({ testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!isAutoplay || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);

  const prev = () => {
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
    setIsAutoplay(false);
  };

  const next = () => {
    setCurrent((p) => (p + 1) % testimonials.length);
    setIsAutoplay(false);
  };

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoplay(false);
  };

  // Show 1 card at a time with auto-rotation
  const displayItems = [testimonials[current]];
  
  return (
    <div className="relative group">
      {/* Single Card Display */}
      <div className="relative mb-8 mx-auto">
        {displayItems.map((testimonial) => (
          <Reveal key={`${current}`} delay={0}>
            <div className="group/card max-w-3xl mx-auto flex flex-col overflow-hidden rounded-2xl border border-red-100/60 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-50/50 animate-in fade-in p-6 sm:p-8">
              {/* Hover glow */}
              <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-red-100/0 blur-[50px] transition-all duration-500 group-hover/card:bg-red-100/40" />

              {/* Icon & Quote */}
              <div className="mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-rose-50">
                  <FontAwesomeIcon 
                    icon={faQuoteLeft} 
                    className="h-5 w-5 text-red-400/60"
                  />
                </div>
              </div>

              {/* Message */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-center mb-5 line-clamp-5">
                &quot;{testimonial.message}&quot;
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-red-200/60 to-transparent my-4" />

              {/* Author */}
              <div className="flex items-center justify-center gap-3 mt-3">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover shrink-0 ring-2 ring-red-100"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-rose-100 text-sm font-bold text-red-600">
                    {testimonial.name.trim().split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 text-left">
                  <p className="font-semibold text-slate-900 text-sm truncate">{testimonial.name}</p>
                  <p className="text-xs text-slate-500 truncate">
                    {testimonial.role}
                    {testimonial.company && ` · ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col items-center gap-6">
        {/* Dots */}
        <div className="flex flex-wrap gap-3 items-center justify-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === current 
                  ? "w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/40" 
                  : "w-2 h-2 bg-slate-200 hover:bg-red-300"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
              title={`${idx + 1} dari ${testimonials.length}`}
            />
          ))}
        </div>

        {/* Prev/Next */}
        <div className="flex gap-4 items-center">
          <button
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-slate-500 backdrop-blur-sm hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
            aria-label="Previous testimonial"
            title="Testimoni sebelumnya"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="h-3.5 w-3.5" />
          </button>

          <span className="text-xs text-slate-500 tabular-nums">
            {current + 1} / {testimonials.length}
          </span>

          <button
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 text-slate-500 backdrop-blur-sm hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
            aria-label="Next testimonial"
            title="Testimoni berikutnya"
          >
            <FontAwesomeIcon icon={faChevronRight} className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
