import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Premium Equipment",
    description:
      "Professional-grade cameras, lenses, and production gear for your creative projects.",
    stat: { value: "500+", label: "gear items" },
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7.5h3l1.5-2h7l1.5 2h3A2 2 0 0 1 22 9.5v8A2 2 0 0 1 20 19.5H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
        />
        <circle cx="12" cy="13.5" r="3.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Flexible Rental",
    description:
      "Rent by the day, week, or project — pick the plan that fits your shoot.",
    stat: { value: "3+", label: "rental plans" },
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Well-Maintained Gear",
    description:
      "Every kit is inspected, cleaned, and tested before it reaches your hands.",
    stat: { value: "100%", label: "checked pre-rental" },
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3 20 6v5c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6l8-3Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Expert Support",
    description:
      "Talk to real crew members who know the gear and can guide your setup.",
    stat: { value: "5min", label: "avg. reply time" },
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-6 w-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 13h3v5H5a1 1 0 0 1-1-1v-4Zm16 0h-3v5h2a1 1 0 0 0 1-1v-4Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 18c-.8 1.2-2.1 2-4 2h-1" />
      </svg>
    ),
  },
];

const trustSignals = [
  "Sony · Canon · Nikon · DJI",
  "Local pickup in Chas",
  "Fast WhatsApp support",
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-white py-16 text-[#111827] sm:py-20 lg:py-24">
      {/* =====================================================
          BACKGROUND TEXTURE
      ====================================================== */}

      {/* Radial brand glows */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(50% 55% at 8% 20%, rgba(59,130,246,0.07), transparent 60%), radial-gradient(50% 55% at 92% 80%, rgba(94,231,242,0.08), transparent 60%)",
        }}
      />

      {/* Faint grid — subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            SPLIT HEADER
        ====================================================== */}

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          {/* Left — eyebrow + title */}
          <div className="lg:col-span-5">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
              Why Rent With Us
            </div>

            <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#111827] sm:text-4xl lg:text-5xl">
              Built for serious
              <span className="block text-[#2563eb]">creators.</span>
            </h2>
          </div>

          {/* Right — description + trust signals */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="max-w-xl text-sm leading-7 text-[#6b7280] sm:text-base">
              From single-camera shoots to full production days, we make
              renting gear simple, reliable, and fast — so you spend less
              time chasing equipment and more time behind the lens.
            </p>

            <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {trustSignals.map((signal) => (
                <li
                  key={signal}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#374151] sm:text-sm"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#3b82f6]/10 text-[#2563eb]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="h-2.5 w-2.5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5 12 4.5 4.5L19 7"
                      />
                    </svg>
                  </span>
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* =====================================================
            FEATURE CARDS
        ====================================================== */}

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3b82f6]/30 hover:shadow-[0_18px_40px_-12px_rgba(59,130,246,0.25)] sm:p-7"
            >
              {/* Top accent sweep */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{
                  background: "linear-gradient(to right, #3b82f6, #5EE7F2)",
                }}
                aria-hidden="true"
              />

              {/* =============================================
                  HEADER ROW — icon + number
              ============================================= */}

              <div className="flex items-start justify-between">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#3b82f6]/15 bg-[#3b82f6]/[0.06] text-[#2563eb] transition-all duration-300 group-hover:border-[#3b82f6]/30 group-hover:bg-[#3b82f6] group-hover:text-white">
                  {feature.icon}

                  {/* Glow behind icon */}
                  <span
                    className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                <span className="font-mono text-xs font-medium tracking-widest text-[#9ca3af] transition-colors duration-300 group-hover:text-[#3b82f6]">
                  {feature.number}
                </span>
              </div>

              {/* =============================================
                  CONTENT
              ============================================= */}

              <h3 className="mt-6 text-base font-semibold tracking-[-0.01em] text-[#111827] sm:text-lg">
                {feature.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-[#6b7280]">
                {feature.description}
              </p>

              {/* =============================================
                  STAT FOOTER
              ============================================= */}

              <div className="mt-6 flex items-baseline gap-2 border-t border-[#f3f4f6] pt-4">
                <span className="text-lg font-bold tracking-[-0.02em] text-[#111827] transition-colors duration-300 group-hover:text-[#2563eb]">
                  {feature.stat.value}
                </span>
                <span className="text-xs font-medium text-[#9ca3af]">
                  {feature.stat.label}
                </span>
              </div>

              {/* Corner glow on hover */}
              <span
                className="pointer-events-none absolute -bottom-12 -right-12 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(94,231,242,0.35), transparent 70%)",
                }}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>

        {/* =====================================================
            BOTTOM CTA STRIP
        ====================================================== */}

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#e5e7eb] bg-white/70 p-5 backdrop-blur-sm sm:flex-row sm:p-6">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-[#111827]">
              Ready to book your gear?
            </p>
            <p className="mt-0.5 text-xs text-[#6b7280]">
              Browse the full catalog or message us on WhatsApp.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
            <Link
              href="/products"
              className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-[0_10px_30px_-8px_rgba(37,99,235,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 sm:w-auto"
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
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#e5e7eb] bg-white px-5 text-sm font-semibold text-[#111827] transition-all duration-300 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/[0.06] hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}