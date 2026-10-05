import Link from "next/link";

const avatars = [
  { initials: "AK", gradient: "from-blue-500 to-blue-700" },
  { initials: "PS", gradient: "from-cyan-500 to-blue-600" },
  { initials: "RM", gradient: "from-emerald-500 to-teal-600" },
  { initials: "VN", gradient: "from-amber-500 to-orange-600" },
];

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#FACC15]" fill="currentColor" aria-hidden="true">
        <path d="M12 2 15 9l7 .6-5.3 4.6 1.6 6.8L12 17.3 5.7 21l1.6-6.8L2 9.6 9 9l3-7Z" />
      </svg>
    ),
    label: "4.9 average rating",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#5EE7F2]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4.5 4.5L19 7" />
      </svg>
    ),
    label: "No booking fees",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#5EE7F2]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </svg>
    ),
    label: "Same-day pickup",
  },
];

export default function ConversionBanner() {
  const whatsappNumber = "919123231968";
  const whatsappMessage = encodeURIComponent(
    "Hi! I'd like to rent some camera gear. Can you help me pick?"
  );

  return (
    <section className="relative overflow-hidden bg-[#0B1120] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      {/* =====================================================
          BACKGROUND — layered glows + grid
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(55% 60% at 15% 20%, rgba(239,68,68,0.16), transparent 60%), radial-gradient(55% 60% at 85% 80%, rgba(59,130,246,0.20), transparent 65%), radial-gradient(45% 55% at 60% 50%, rgba(94,231,242,0.09), transparent 70%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 78%)",
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
          CONTENT
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* =================================================
              LEFT — copy
          ================================================== */}

          <div className="lg:col-span-7">
            {/* Availability pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#5EE7F2]/30 bg-[#5EE7F2]/[0.08] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5EE7F2] sm:text-[11px]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EE7F2] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EE7F2]" />
              </span>
              Booking for this week
            </div>

            {/* Heading */}
            <h2 className="max-w-2xl text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Ready to shoot?
              <span className="mt-1 block text-[#5EE7F2]">
                Let&apos;s get you the gear.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              Browse the catalog or message us directly. We&apos;ll help you
              pick the right setup and confirm availability — usually within a
              few minutes.
            </p>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/50">
              {trustItems.map((item, index) => (
                <div key={item.label} className="flex items-center gap-x-6">
                  <span className="inline-flex items-center gap-1.5">
                    {item.icon}
                    {item.label}
                  </span>
                  {index < trustItems.length - 1 && (
                    <span className="hidden h-3 w-px bg-white/10 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT — action card
          ================================================== */}

          <div className="lg:col-span-5">
            <div className="relative">
              {/* Glow behind card */}
              <div
                className="pointer-events-none absolute -inset-4 rounded-[28px] opacity-60 blur-2xl"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(94,231,242,0.22), transparent 70%)",
                }}
              />

              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-7">
                {/* Inner top highlight */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(94,231,242,0.55), transparent)",
                  }}
                />

                {/* Social proof — avatars */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {avatars.map((avatar) => (
                      <div
                        key={avatar.initials}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0B1120] bg-gradient-to-br ${avatar.gradient} text-[10px] font-bold text-white shadow-md`}
                      >
                        {avatar.initials}
                      </div>
                    ))}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0B1120] bg-white/10 text-[10px] font-bold text-white/80 backdrop-blur-sm">
                      +2K
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Trusted by 2000+ creators
                    </p>
                    <p className="text-[11px] text-white/45">
                      Since day one
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Primary CTA — Browse */}
                <Link
                  href="/products"
                  className="group flex w-full items-center justify-between gap-3 rounded-2xl bg-[#5EE7F2] px-5 py-4 text-left text-sm font-semibold text-[#090A0D] shadow-[0_10px_30px_-8px_rgba(94,231,242,0.5)] transition-all duration-300 hover:bg-[#7CEEF7] hover:shadow-[0_14px_40px_-8px_rgba(94,231,242,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE7F2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#090A0D]/10">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 4h1.5l1.2 11h10.8l1.2-8H7"
                        />
                        <circle cx="9" cy="19" r="1.2" />
                        <circle cx="17" cy="19" r="1.2" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span>Browse Full Catalog</span>
                      <span className="text-[10px] font-medium text-[#090A0D]/60">
                        500+ items ready to rent
                      </span>
                    </span>
                  </span>
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                {/* Secondary CTA — WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 flex w-full items-center justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-4 text-left text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#25D366]/45 hover:bg-[#25D366]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366]/15">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-[#25D366]"
                        aria-hidden="true"
                      >
                        <path d="M20.5 3.5A11.9 11.9 0 0 0 12.03 0C5.45 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.95L.03 24l6.27-1.64a11.9 11.9 0 0 0 5.73 1.46h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.47-8.39ZM12.04 21.85h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.86 9.86 0 0 1-1.52-5.3C2.15 6.48 6.58 2.05 12.04 2.05c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.69.15-.2.3-.79.97-.97 1.17-.18.2-.36.23-.66.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.31.3-.51.1-.2.05-.38-.03-.54-.08-.15-.69-1.66-.94-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.51.08-.77.38-.26.3-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.15 4.99 4.42.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.18-1.42-.08-.13-.28-.2-.58-.35Z" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span>Chat on WhatsApp</span>
                      <span className="text-[10px] font-medium text-white/45">
                        Usually replies in ~5 min
                      </span>
                    </span>
                  </span>
                  <span className="text-lg text-[#25D366] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                {/* Bottom live signal */}
                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-white/40">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  </span>
                  Team online now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}