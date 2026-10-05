import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConversionBanner from "@/components/ConversionBanner";

export const metadata = {
  title: "About Us | Golu Camera Rental House",
  description:
    "Professional camera and production equipment rental for photographers, filmmakers, and creators in Chas. Quality-checked gear, carefully prepared for every shoot.",
  openGraph: {
    title: "About Golu Camera Rental House",
    description:
      "Professional camera gear, carefully maintained and ready for your next shoot.",
    type: "website",
  },
};

/* =====================================================
   HERO STATS
====================================================== */

const heroStats = [
  { value: "500+", label: "Gear items" },
  { value: "2000+", label: "Rentals" },
  { value: "4.9", label: "Avg rating" },
];

/* =====================================================
   VALUES — with stat footers
====================================================== */

const values = [
  {
    title: "Quality Checked Gear",
    description:
      "Every item is inspected and prepared carefully so you can focus on your shoot, not the equipment.",
    stat: "100%",
    statLabel: "checked pre-rental",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5.5 6v5.25c0 4.18 2.74 7.96 6.5 9.25 3.76-1.29 6.5-5.07 6.5-9.25V6L12 3Z" />
      </svg>
    ),
  },
  {
    title: "Flexible Rental",
    description:
      "Choose the gear that fits your project and discuss your rental terms directly with our team.",
    stat: "3+",
    statLabel: "rental plans",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "Affordable Rental",
    description:
      "We aim to make professional camera and production equipment accessible for every kind of creator.",
    stat: "Every",
    statLabel: "budget friendly",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M15 8.5c-.7-1-1.8-1.5-3-1.5-1.66 0-3 1.12-3 2.5s1.34 2.5 3 2.5 3 1.12 3 2.5-1.34 2.5-3 2.5c-1.2 0-2.3-.5-3-1.5" />
      </svg>
    ),
  },
  {
    title: "Customer Support",
    description:
      "Not sure what to rent? Talk to our team and we'll help you pick the right gear for your shoot.",
    stat: "5 min",
    statLabel: "avg reply time",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11.5a7 7 0 0 1-7 7H8l-4 2 1.5-4A7 7 0 1 1 19 11.5Z" />
      </svg>
    ),
  },
];

/* =====================================================
   MAINTENANCE STEPS
====================================================== */

const maintenanceSteps = [
  {
    number: "01",
    title: "Inspect & Clean",
    description:
      "Equipment is visually inspected and cleaned before being prepared for rental.",
  },
  {
    number: "02",
    title: "Check & Prepare",
    description:
      "Important components are tested and the gear is prepared for the customer's shoot.",
  },
  {
    number: "03",
    title: "Pack & Protect",
    description:
      "Equipment is packed carefully to keep it protected during handling and transport.",
  },
];

/* =====================================================
   SERVICES — with icons
====================================================== */

const services = [
  {
    name: "Wedding Photography",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s-7-4.5-9-9c-1-3 1-6 4-6 2 0 3.5 1.5 5 3 1.5-1.5 3-3 5-3 3 0 5 3 4 6-2 4.5-9 9-9 9Z"
        />
      </svg>
    ),
  },
  {
    name: "Pre-Wedding Shoots",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    name: "Cinematography & Videos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
        <rect x="3" y="6" width="14" height="12" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m17 10 4-2v8l-4-2" />
      </svg>
    ),
  },
  {
    name: "Events & Parties",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v4M5 6l3 3M19 6l-3 3M4 12h4M16 12h4M12 21a6 6 0 0 0 6-6H6a6 6 0 0 0 6 6Z"
        />
      </svg>
    ),
  },
  {
    name: "Travel Photography",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
        <circle cx="12" cy="12" r="9" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
        />
      </svg>
    ),
  },
  {
    name: "YouTube & Content Creation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
        <rect x="3" y="6" width="18" height="12" rx="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m10 9 5 3-5 3V9Z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#090A0D]">
          {/* Background glow — matches brand gradient */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(40% 50% at 15% 20%, rgba(59,130,246,0.18), transparent 60%), radial-gradient(40% 50% at 85% 80%, rgba(239,68,68,0.14), transparent 60%), radial-gradient(50% 60% at 50% 100%, rgba(94,231,242,0.10), transparent 70%)",
            }}
          />

          {/* Faint grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />

          {/* Top accent line — matches Header */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background:
                "linear-gradient(to right, #ef4444 0%, #3b82f6 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#5EE7F2]/30 bg-[#5EE7F2]/[0.08] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5EE7F2] sm:text-[11px]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EE7F2] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EE7F2]" />
                </span>
                About Golu Camera Rental House
              </div>

              <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                Professional Gear.
                <span className="block text-[#5EE7F2]">
                  Ready to Create.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                We provide camera and production equipment for photographers,
                filmmakers, event professionals, and content creators looking
                for dependable gear for their next project.
              </p>

              {/* Hero stat strip */}
              <div className="mt-10 grid max-w-2xl grid-cols-3 divide-x divide-white/[0.08] border-y border-white/[0.08]">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-4 py-4 first:pl-0 last:pr-0 sm:px-6"
                  >
                    <p className="text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHO WE ARE
        ===================================================== */}

        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                Who We Are
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#111827] sm:text-4xl">
                Gear that helps bring your ideas to life.
              </h2>

              <div className="mt-6 space-y-5 text-sm leading-7 text-[#6B7280] sm:text-base">
                <p>
                  Golu Camera Rental House provides professional camera and
                  production equipment for a wide range of photography and
                  video requirements.
                </p>
                <p>
                  From wedding and pre-wedding shoots to events, travel,
                  cinematography, and content creation, our goal is to make
                  reliable equipment easier to access for your next project.
                </p>
                <p>
                  We focus on keeping our equipment well maintained and
                  preparing it carefully so that you can spend more time
                  creating and less time worrying about your gear.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  "Professional Equipment",
                  "Well Maintained Gear",
                  "Creator Friendly",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3.5 py-1.5 text-xs font-medium text-[#374151] transition-colors duration-300 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/[0.06] hover:text-[#2563eb]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 text-[#2563eb]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5 12 4.5 4.5L19 7"
                      />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual — dark stage with product floating on it */}
            <div className="relative">
              {/* Frame accents */}
              <div
                className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl border border-[#3b82f6]/15 bg-[#3b82f6]/5"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl border border-[#5EE7F2]/20 bg-[#5EE7F2]/5"
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F3F4F6] p-3 shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1120] via-[#0B1120] to-[#111827]">
                  {/* Soft glow behind product */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                    style={{
                      background:
                        "radial-gradient(55% 55% at 50% 50%, rgba(94,231,242,0.14), transparent 70%)",
                    }}
                  />

                  {/* Product image — contained, with padding */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
                    <img
                      src="/images/equipment/cameras/Sony-A7-III-1.jpg"
                      alt="Professional camera equipment available for rental"
                      className="h-full w-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out hover:scale-[1.04]"
                    />
                  </div>

                  {/* Bottom gradient + caption */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#090A0D] via-[#090A0D]/70 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5EE7F2]">
                      Golu Camera Rental House
                    </p>
                    <p className="mt-1.5 text-lg font-semibold leading-snug text-white">
                      Professional equipment for your next shoot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            VALUES
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#F9FAFB] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.6]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(50% 60% at 10% 20%, rgba(59,130,246,0.06), transparent 60%), radial-gradient(50% 60% at 90% 80%, rgba(94,231,242,0.06), transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                What We Stand For
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#111827] sm:text-4xl">
                Built around your shoot.
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#6B7280] sm:text-base">
                From equipment selection to preparation, we focus on making
                the rental experience simple and dependable.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <article
                  key={value.title}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3b82f6]/30 hover:shadow-[0_18px_40px_-12px_rgba(59,130,246,0.25)] sm:p-7"
                >
                  {/* Top accent sweep */}
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{
                      background:
                        "linear-gradient(to right, #3b82f6, #5EE7F2)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Icon chip */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#3b82f6]/15 bg-[#3b82f6]/[0.06] text-[#2563eb] transition-all duration-300 group-hover:border-[#3b82f6]/30 group-hover:bg-[#3b82f6] group-hover:text-white">
                    {value.icon}
                    <span
                      className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)",
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-[#111827]">
                    {value.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-[#6B7280]">
                    {value.description}
                  </p>

                  {/* Stat footer */}
                  <div className="mt-6 flex items-baseline gap-2 border-t border-[#F3F4F6] pt-4">
                    <span className="text-lg font-bold tracking-[-0.02em] text-[#111827] transition-colors duration-300 group-hover:text-[#2563eb]">
                      {value.stat}
                    </span>
                    <span className="text-xs font-medium text-[#9CA3AF]">
                      {value.statLabel}
                    </span>
                  </div>

                  {/* Corner glow */}
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
          </div>
        </section>

        {/* =====================================================
            TRUST BANNER
        ===================================================== */}

        <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0B1120]">
            <div className="relative px-6 py-12 sm:px-10 lg:px-16 lg:py-14">
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#3b82f6]/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#ef4444]/10 blur-3xl"
                aria-hidden="true"
              />

              {/* Top accent line */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(to right, #ef4444 0%, #3b82f6 100%)",
                }}
                aria-hidden="true"
              />

              <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5EE7F2]">
                    Our Promise
                  </p>

                  <h2 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                    Professional Gear.
                    <span className="text-[#5EE7F2]">
                      {" "}
                      Carefully Maintained.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
                    We believe good equipment should give creators confidence
                    when they step onto a shoot. That&apos;s why we focus on
                    equipment quality, preparation, and customer satisfaction.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { title: "Camera Gear", sub: "For photography & video" },
                    {
                      title: "Production Gear",
                      sub: "Supporting your workflow",
                    },
                    { title: "Careful Prep", sub: "Before every rental" },
                    { title: "Local Support", sub: "Based in Chas" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-white/45">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            EQUIPMENT CARE
        ===================================================== */}

        <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              {/* Left */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                  Equipment Care
                </div>

                <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#111827] sm:text-4xl">
                  Prepared before it reaches you.
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-[#6B7280] sm:text-base">
                  Every rental starts with preparation. Our equipment care
                  process is designed to help ensure the gear is ready for the
                  work you have planned.
                </p>

                <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-5">
                  <p className="text-sm font-semibold text-[#111827]">
                    Quality comes first.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    From inspection and cleaning to careful packing, we take
                    practical steps to prepare equipment for rental.
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {maintenanceSteps.map((step) => (
                  <div
                    key={step.number}
                    className="group relative flex gap-5 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3b82f6]/30 hover:shadow-[0_18px_40px_-12px_rgba(59,130,246,0.25)]"
                  >
                    {/* Left accent line on hover */}
                    <span
                      className="pointer-events-none absolute inset-y-3 left-0 w-[2px] origin-top scale-y-0 rounded-full transition-transform duration-500 group-hover:scale-y-100"
                      style={{
                        background:
                          "linear-gradient(to bottom, #3b82f6, #5EE7F2)",
                      }}
                      aria-hidden="true"
                    />

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#3b82f6]/15 bg-[#3b82f6]/[0.06] font-mono text-xs font-bold text-[#2563eb] transition-all duration-300 group-hover:bg-[#3b82f6] group-hover:text-white">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="text-base font-semibold tracking-[-0.01em] text-[#111827]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-[#6B7280]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHO WE SERVE
        ===================================================== */}

        <section className="relative bg-[#F9FAFB] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                  Made For Creators
                </div>

                <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#111827] sm:text-4xl">
                  Gear for different kinds of stories.
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#6B7280] sm:text-base">
                  Whether you&apos;re documenting a special day, producing a
                  professional video, or creating content for your audience,
                  our equipment catalog is built to support a variety of
                  shooting requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="group flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-5 py-4 transition-all duration-300 hover:border-[#3b82f6]/30 hover:shadow-[0_8px_24px_-8px_rgba(59,130,246,0.2)]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#3b82f6]/15 bg-[#3b82f6]/[0.06] text-[#2563eb] transition-all duration-300 group-hover:border-[#3b82f6]/30 group-hover:bg-[#3b82f6] group-hover:text-white">
                      {service.icon}
                    </span>

                    <span className="text-sm font-semibold text-[#374151] transition-colors duration-300 group-hover:text-[#111827]">
                      {service.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <ConversionBanner />
      </main>

      <Footer />
    </>
  );
}