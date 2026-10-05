"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/images/equipment/cameras/Sony-A7-III-1.jpg",
    alt: "Sony A7 III camera available for rental",
  },
  {
    image: "/images/equipment/cameras/Nikon-Z6-II-1.jpg",
    alt: "Nikon Z6 II camera available for rental",
  },
  {
    image: "/images/equipment/drones/DJI-Drone-1.jpg",
    alt: "DJI drone available for rental",
  },
  {
    image: "/images/equipment/gimbals/Camera-Gimbal-1.jpg",
    alt: "Camera gimbal available for rental",
  },
  {
    image: "/images/equipment/cameras/Canon-80D-1.jpg",
    alt: "Canon 80D camera available for rental",
  },
  {
    image: "/images/equipment/cameras/Nikon-Z50-II-1.jpg",
    alt: "Nikon Z50 II camera available for rental",
  },
];

/* =====================================================
   COLLAGE SLOTS — fixed positions, varied sizes
   The active slide always occupies slot 0 (the feature).
   Other images rotate through the remaining slots.
====================================================== */

const slots = [
  // Slot 0 — the feature (biggest, centered, never rotated)
  {
    top: "6%",
    left: "32%",
    width: "36%",
    aspect: "4 / 3",
    rotate: "0deg",
    isFeature: true,
    mobileHidden: false,
  },
  // Slot 1 — top-left medium square
  {
    top: "4%",
    left: "2%",
    width: "22%",
    aspect: "1 / 1",
    rotate: "-4deg",
    isFeature: false,
    mobileHidden: false,
  },
  // Slot 2 — top-right medium
  {
    top: "8%",
    left: "72%",
    width: "24%",
    aspect: "4 / 3",
    rotate: "3deg",
    isFeature: false,
    mobileHidden: false,
  },
  // Slot 3 — mid-left small
  {
    top: "32%",
    left: "8%",
    width: "16%",
    aspect: "1 / 1",
    rotate: "6deg",
    isFeature: false,
    mobileHidden: true,
  },
  // Slot 4 — mid-right small
  {
    top: "34%",
    left: "80%",
    width: "15%",
    aspect: "1 / 1",
    rotate: "-5deg",
    isFeature: false,
    mobileHidden: true,
  },
  // Slot 5 — low-center accent (fades into gradient)
  {
    top: "42%",
    left: "46%",
    width: "16%",
    aspect: "4 / 3",
    rotate: "2deg",
    isFeature: false,
    mobileHidden: true,
  },
];

const stats = [
  { value: "500+", label: "Equipment Items" },
  { value: "2000+", label: "Happy Customers" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* ==========================================
     NAVIGATION
  ========================================== */

  const nextSlide = () =>
    setActiveIndex((current) => (current + 1) % slides.length);

  const previousSlide = () =>
    setActiveIndex(
      (current) => (current - 1 + slides.length) % slides.length
    );

  /* ==========================================
     AUTOPLAY
  ========================================== */

  useEffect(() => {
    if (isPaused) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  /* ==========================================
     KEYBOARD NAV
  ========================================== */

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0B1120] to-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================================
          AMBIENT BACKGROUND GLOWS
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(45% 55% at 12% 15%, rgba(239,68,68,0.14), transparent 60%), radial-gradient(50% 60% at 88% 85%, rgba(59,130,246,0.20), transparent 65%), radial-gradient(40% 50% at 50% 50%, rgba(94,231,242,0.08), transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Top accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: "linear-gradient(to right, #ef4444 0%, #3b82f6 100%)",
        }}
        aria-hidden="true"
      />

      {/* =====================================================
          STAGE + CARD
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 sm:mb-10 lg:mb-12">
          {/* =================================================
              STAGE
          ================================================== */}

          <div className="relative h-[540px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white via-white to-slate-100 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.75)] sm:h-[600px] md:h-[640px] lg:h-[700px]">
            {/* Soft studio glow behind collage */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[70%]"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 40%, rgba(94,231,242,0.10), transparent 65%)",
              }}
            />

            {/* =============================================
                COLLAGE — Pinterest-style scattered images
            ============================================= */}

            <div className="absolute inset-0 z-[2]">
              {slots.map((slot, slotIndex) => {
                // Which slide image lives in this slot?
                const slideIndex = (activeIndex + slotIndex) % slides.length;
                const slide = slides[slideIndex];

                return (
                  <div
                    key={slotIndex}
                    className={`absolute transition-all duration-700 ease-out ${
                      slot.mobileHidden ? "hidden md:block" : ""
                    }`}
                    style={{
                      top: slot.top,
                      left: slot.left,
                      width: slot.width,
                      aspectRatio: slot.aspect,
                      transform: `rotate(${slot.rotate})`,
                      zIndex: slot.isFeature ? 30 : 20 - slotIndex,
                    }}
                  >
                    {/* Image card */}
                    <div
                      className={`relative h-full w-full overflow-hidden rounded-2xl bg-white ${
                        slot.isFeature
                          ? "border-2 border-[#5EE7F2]/40 shadow-[0_25px_60px_-15px_rgba(94,231,242,0.35),0_15px_40px_-20px_rgba(0,0,0,0.5)]"
                          : "border border-slate-200/80 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.35)]"
                      }`}
                    >
                      <img
                        key={slide.image}
                        src={slide.image}
                        alt={slide.alt}
                        loading={slotIndex === 0 ? "eager" : "lazy"}
                        className="collage-image h-full w-full object-contain p-3 sm:p-4"
                      />

                      {/* Featured shimmer line */}
                      {slot.isFeature && (
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
                          aria-hidden="true"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, rgba(94,231,242,0.8), transparent)",
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* =============================================
                CINEMATIC FLOOR — gradient from transparent to dark
            ============================================= */}

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[58%]"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(11,17,32,0.35) 28%, rgba(11,17,32,0.85) 62%, rgba(11,17,32,1) 100%)",
              }}
            />

            {/* =============================================
                ARROW CONTROLS
            ============================================= */}

            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="absolute left-4 top-[32%] z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0B1120]/70 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#5EE7F2]/60 hover:bg-[#5EE7F2]/20 hover:text-[#5EE7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE7F2] md:flex lg:left-6"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 18-6-6 6-6"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-4 top-[32%] z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0B1120]/70 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#5EE7F2]/60 hover:bg-[#5EE7F2]/20 hover:text-[#5EE7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE7F2] md:flex lg:right-6"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 18 6-6-6-6"
                />
              </svg>
            </button>

            {/* =============================================
                CONTENT CARD
            ============================================= */}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-12 sm:px-6 sm:pb-14 lg:px-12 lg:pb-16">
              <div className="pointer-events-auto w-full max-w-3xl">
                {/* Eyebrow badge */}
                <div className="mb-3 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#5EE7F2]/40 bg-[#0B1120]/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5EE7F2] backdrop-blur-md sm:px-4 sm:py-2 sm:text-[11px]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EE7F2] opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EE7F2]" />
                    </span>
                    Chas&apos;s Premier Equipment Rental
                  </div>
                </div>

                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]/95 p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md sm:p-6 lg:p-7">
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    aria-hidden="true"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(94,231,242,0.5), transparent)",
                    }}
                  />

                  <div
                    className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full opacity-50 blur-3xl"
                    aria-hidden="true"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(94,231,242,0.30), transparent 70%)",
                    }}
                  />

                  <div className="relative text-center">
                    <h1 className="text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-3xl lg:text-4xl xl:text-[42px]">
                      Capture Brilliance.
                      <span className="block text-[#5EE7F2]">
                        Rent with Confidence.
                      </span>
                    </h1>

                    <p className="mx-auto mt-3 hidden max-w-xl text-sm leading-6 text-white/65 sm:mt-4 md:block lg:text-base lg:leading-7">
                      Professional camera and production equipment for rent in
                      Chas. Premium gear from Canon, Sony, and Nikon — verified
                      before every shoot.
                    </p>

                    <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">
                      <Link
                        href="/products"
                        className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#5EE7F2] px-5 text-sm font-semibold text-[#090A0D] shadow-[0_10px_30px_-8px_rgba(94,231,242,0.5)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#7CEEF7] hover:shadow-[0_12px_35px_-8px_rgba(94,231,242,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE7F2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120] sm:w-auto sm:px-6"
                      >
                        Browse Equipment
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14M12 5l7 7-7 7"
                          />
                        </svg>
                      </Link>

                      <Link
                        href="/contact"
                        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-[#5EE7F2]/50 hover:bg-[#5EE7F2]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE7F2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120] sm:w-auto sm:px-6"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================
                DOTS
            ============================================= */}

            <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-2">
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={slide.image}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex h-5 items-center justify-center px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE7F2]"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-7 bg-[#5EE7F2] shadow-[0_0_12px_rgba(94,231,242,0.7)]"
                          : "w-1.5 bg-white/40 group-hover:bg-white/70"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =================================================
            STATS ROW
        ================================================== */}

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 shrink-0 text-[#FACC15] sm:h-[18px] sm:w-[18px]"
                aria-hidden="true"
              >
                <path d="M11.5 2.3a.5.5 0 0 1 .95 0l2.31 4.68a2.1 2.1 0 0 0 1.6 1.16l5.16.75a.53.53 0 0 1 .3.9l-3.74 3.64a2.12 2.12 0 0 0-.61 1.88l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.12 2.12 0 0 0-1.97 0l-4.62 2.43a.53.53 0 0 1-.77-.56l.88-5.14a2.12 2.12 0 0 0-.61-1.88L2.16 9.79a.53.53 0 0 1 .3-.9l5.16-.76a2.12 2.12 0 0 0 1.6-1.15z" />
              </svg>
              <span className="text-sm font-medium text-white/75 sm:text-base">
                <span className="font-semibold text-white">{stat.value}</span>{" "}
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}