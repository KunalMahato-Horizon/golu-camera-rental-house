"use client";

import { useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConversionBanner from "@/components/ConversionBanner";
import WhatsAppButton from "@/components/WhatsAppButton";

/* =====================================================
   CONTACT DETAILS
====================================================== */

const contactDetails = [
  {
    title: "Visit Us",
    value: "Jodhadi(h) Mor, Chas",
    description: "Near Gurudwara, Bokaro",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
        />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Call Us",
    value: "+91 91232 19168",
    description: "+91 70618 20742",
    href: "tel:+919123231968",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"
        />
      </svg>
    ),
  },
  {
    title: "Email Us",
    value: "golu820753@gmail.com",
    description: "For rental & general inquiries",
    href: "mailto:golu820753@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3 7 9 6 9-6"
        />
      </svg>
    ),
  },
];

/* =====================================================
   FAQS
====================================================== */

const faqs = [
  {
    question: "How can I check equipment availability?",
    answer:
      "Browse the equipment catalog and add what you're interested in to your rental cart. Then send the selection to us on WhatsApp — we'll confirm availability and rental details.",
  },
  {
    question: "What documents are required for a rental?",
    answer:
      "Rental requirements typically include a valid government ID, address proof, and contact details. The rental team will confirm the exact requirements before your booking is finalized.",
  },
  {
    question: "How does the security deposit work?",
    answer:
      "Security deposit requirements are confirmed by the rental team based on the equipment and rental arrangement. Please contact us directly for the applicable details.",
  },
  {
    question: "Is equipment insurance included?",
    answer:
      "Insurance coverage isn't part of the standard rental terms. If you have questions about equipment protection or insurance for your project, please contact the rental team.",
  },
];

/* =====================================================
   WHATSAPP CARD FEATURES
====================================================== */

const whatsappFeatures = [
  {
    title: "Check Equipment",
    sub: "Ask about availability",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
      </svg>
    ),
  },
  {
    title: "Discuss Your Requirement",
    sub: "Get help picking the right gear",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 11.5a7 7 0 0 1-7 7H8l-4 2 1.5-4A7 7 0 1 1 19 11.5Z"
        />
      </svg>
    ),
  },
];

/* =====================================================
   LOCATION — constants
====================================================== */

const LAT = "23.620988878758883";
const LNG = "86.18298107511089";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3474.6625764604923!2d86.18298107511089!3d23.620988878758883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f427d27a13854b%3A0xb77b7e287cfa4ba6!2sGolu%20Camera%20Rental%20House!5e1!3m2!1sen!2sin!4v1791212683901!5m2!1sen!2sin";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-[#090A0D]">
          {/* Background glow — matches site palette */}
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

          {/* Top accent line */}
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
                Get In Touch
              </div>

              <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                Let&apos;s talk about
                <span className="block text-[#5EE7F2]">
                  your next shoot.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                Have questions about equipment availability, rental
                requirements, or your next project? Get in touch with our
                team and we&apos;ll help you find the right gear.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT INFORMATION + WHATSAPP
        ===================================================== */}

        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
            {/* =================================================
                LEFT COLUMN — Contact cards
            ================================================= */}

            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                Contact Information
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#111827] sm:text-4xl">
                Let&apos;s talk about your shoot.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#6B7280] sm:text-base">
                Whether you need a camera for a wedding, a lens for a
                pre-wedding shoot, or equipment for a video project, contact
                us to discuss your requirements.
              </p>

              {/* Contact cards */}
              <div className="mt-8 space-y-3">
                {contactDetails.map((item) => {
                  const content = (
                    <>
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#3b82f6]/15 bg-[#3b82f6]/[0.06] text-[#2563eb] transition-all duration-300 group-hover:border-[#3b82f6]/30 group-hover:bg-[#3b82f6] group-hover:text-white">
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">
                          {item.title}
                        </p>
                        <p className="mt-1 break-words text-sm font-semibold text-[#111827]">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                          {item.description}
                        </p>
                      </div>
                    </>
                  );

                  const baseClasses =
                    "group relative flex gap-4 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all duration-300";

                  const interactiveClasses =
                    "hover:-translate-y-0.5 hover:border-[#3b82f6]/30 hover:shadow-[0_18px_40px_-12px_rgba(59,130,246,0.25)]";

                  return item.href ? (
                    <a
                      key={item.title}
                      href={item.href}
                      className={`${baseClasses} ${interactiveClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]`}
                    >
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                        style={{
                          background:
                            "linear-gradient(to right, #3b82f6, #5EE7F2)",
                        }}
                        aria-hidden="true"
                      />
                      {content}
                    </a>
                  ) : (
                    <div key={item.title} className={baseClasses}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                RIGHT COLUMN — WhatsApp card
            ================================================= */}

            <div className="flex items-center">
              <div className="relative w-full overflow-hidden rounded-3xl bg-[#0B1120] p-7 shadow-xl sm:p-9">
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#25D366]/10 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#3b82f6]/10 blur-3xl"
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

                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#5EE7F2]/20 bg-[#5EE7F2]/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5EE7F2]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EE7F2] opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EE7F2]" />
                    </span>
                    Fastest reply
                  </span>

                  <h2 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                    Looking for the right gear for your shoot?
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    Tell us about your project and the equipment you&apos;re
                    looking for. Our team can help you check availability and
                    rental details — usually within a few minutes.
                  </p>

                  {/* Feature rows */}
                  <div className="mt-8 space-y-3">
                    {whatsappFeatures.map((item) => (
                      <div
                        key={item.title}
                        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#5EE7F2]/15 bg-[#5EE7F2]/[0.06] text-[#5EE7F2] transition-all duration-300 group-hover:bg-[#5EE7F2] group-hover:text-[#0B1120]">
                          {item.icon}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-white/45">
                            {item.sub}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp CTA */}
                  <div className="mt-8">
                    <WhatsAppButton
                      variant="solid"
                      size="lg"
                      label="Chat on WhatsApp"
                      message="Hi! I have a question about renting camera gear. Can you help?"
                      className="w-full"
                    />
                  </div>

                  <p className="mt-3 text-center text-[11px] leading-5 text-white/40">
                    Available for equipment availability and rental inquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            LOCATION
        ===================================================== */}

        <section className="relative bg-[#F9FAFB] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                Find Us
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#111827] sm:text-4xl">
                Visit Golu Camera Rental House
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#6B7280] sm:text-base">
                We&apos;re located at Jodhadi(h) Mor, Chas, near Gurudwara.
              </p>
            </div>

            {/* Location card */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm">
              {/* =============================================
                  EMBEDDED MAP
              ============================================= */}

              <div className="relative h-[360px] w-full sm:h-[420px] lg:h-[480px]">
                <iframe
                  title="Golu Camera Rental House location on Google Maps"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[15%]"
                />

                {/* =============================================
                    FLOATING INFO CARD (over the map)
                ============================================= */}

                <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-sm">
                  <div className="pointer-events-auto rounded-2xl border border-white/40 bg-white/95 p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-5">
                    {/* Business info */}
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3b82f6]/10 text-[#2563eb]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
                          />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#111827]">
                          Golu Camera Rental House
                        </p>
                        <p className="mt-0.5 text-xs leading-5 text-[#6B7280]">
                          Jodhadi(h) Mor, Chas
                          <br />
                          Near Gurudwara, Bokaro
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <a
                        href={DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        Directions
                      </a>

                      <a
                        href="tel:+919123231968"
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-semibold text-[#374151] transition-all duration-200 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/[0.06] hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"
                          />
                        </svg>
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* =============================================
                  LOCATION FOOTER
              ============================================= */}

              <div className="flex flex-col gap-4 border-t border-[#E5E7EB] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#3b82f6]/15 bg-[#3b82f6]/[0.06] text-[#2563eb]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
                      />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#111827]">
                      Jodhadi(h) Mor, Chas
                    </p>
                    <p className="mt-0.5 text-xs text-[#6B7280]">
                      Near Gurudwara, Bokaro
                    </p>
                  </div>
                </div>

                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563eb] transition-colors hover:text-[#1d4ed8]"
                >
                  Get directions
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FAQ
        ===================================================== */}

        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                FAQ
              </div>

              <h2 className="text-3xl font-bold tracking-[-0.02em] text-[#111827] sm:text-4xl">
                Frequently Asked Questions
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#6B7280]">
                A few common questions about getting started with a rental.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                      isOpen
                        ? "border-[#3b82f6]/30 shadow-[0_18px_40px_-12px_rgba(59,130,246,0.25)]"
                        : "border-[#E5E7EB] hover:border-[#3b82f6]/20"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-inset sm:px-6"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-semibold text-[#111827] sm:text-base">
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 bg-[#3b82f6] text-white"
                            : "bg-[#F3F4F6] text-[#6B7280] group-hover:bg-[#EFF6FF] group-hover:text-[#2563eb]"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-[#F3F4F6] px-5 py-5 text-sm leading-7 text-[#6B7280] sm:px-6">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <ConversionBanner
          eyebrow="Let's talk gear"
          title="Still have questions?"
          titleAccent="We're one message away."
          description="Message us on WhatsApp with what you're shooting and we'll recommend the right camera, lens, and lighting setup — usually within a few minutes."
          whatsappMessage="Hi! I'm on the contact page and have a question about renting gear."
        />
      </main>

      <Footer />
    </>
  );
}