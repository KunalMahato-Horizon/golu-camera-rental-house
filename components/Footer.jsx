import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Gear", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/golucamerarentalhouse?stkn=MTRscnJhazdweDQxbA==",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-4 w-4"
      >
        <rect width="18" height="18" x="3" y="3" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919123231968",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.5 3.5A11.9 11.9 0 0 0 12.03 0C5.45 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.95L.03 24l6.27-1.64a11.9 11.9 0 0 0 5.73 1.46h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.47-8.39ZM12.04 21.85h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.86 9.86 0 0 1-1.52-5.3C2.15 6.48 6.58 2.05 12.04 2.05c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.69.15-.2.3-.79.97-.97 1.17-.18.2-.36.23-.66.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.31.3-.51.1-.2.05-.38-.03-.54-.08-.15-.69-1.66-.94-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.51.08-.77.38-.26.3-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.15 4.99 4.42.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.18-1.42-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@golucamerarentalhouse?si=7wMxCoOPSerekyA7",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.5 3.8-6.5 3.8Z" />
      </svg>
    ),
  },
];

// Computed once at module scope — avoids hydration mismatch around New Year
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B1120] text-white">
      {/* Top accent line — matches Header */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: "linear-gradient(to right, #ef4444 0%, #3b82f6 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(50% 60% at 15% 0%, rgba(59,130,246,0.08), transparent 70%), radial-gradient(50% 60% at 85% 100%, rgba(94,231,242,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        {/* =====================================================
            MAIN FOOTER GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-16">
          {/* =================================================
              BRAND COLUMN
          ================================================== */}
          <div className="lg:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              {/* Logo Mark */}
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.04] transition-colors duration-300 group-hover:border-white/30">
                <span
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.4), transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <span className="relative text-sm font-bold tracking-tight">GC</span>
              </div>

              {/* Brand Name */}
              <div>
                <p className="text-sm font-bold tracking-[0.08em] text-white">
                  GOLU CAMERA
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF]">
                  Rental House
                </p>
              </div>
            </Link>

            <p className="mt-6 text-sm font-semibold text-[#5EE7F2]">
              Capture Brilliance. Rent with Confidence.
            </p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-[#9CA3AF]">
              Professional camera and equipment rental for photographers,
              filmmakers, and creators across Chas.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[#9CA3AF] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5EE7F2]/40 hover:bg-[#5EE7F2]/10 hover:text-[#5EE7F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE7F2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================== */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-white"
                  >
                    <span className="relative">
                      {link.name}
                      {/* Animated underline */}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#5EE7F2] transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              HOURS
          ================================================== */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Hours
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <p className="text-[11px] font-medium uppercase tracking-wider text-[#9CA3AF]">
                  Mon – Sat
                </p>
                <p className="mt-0.5 text-white">9:00 AM – 9:00 PM</p>
              </li>
              <li>
                <p className="text-[11px] font-medium uppercase tracking-wider text-[#9CA3AF]">
                  Sunday
                </p>
                <p className="mt-0.5 text-white">10:00 AM – 6:00 PM</p>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                </span>
                <span className="text-xs text-[#5EE7F2]">Open today</span>
              </li>
            </ul>
          </div>

          {/* =================================================
              CONTACT
          ================================================== */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Get in Touch
            </h3>

            <div className="mt-5 space-y-5">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#5EE7F2]/15 bg-[#5EE7F2]/[0.06] text-[#5EE7F2]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z" />
                    <circle cx="12" cy="9" r="2.3" />
                  </svg>
                </div>
                <p className="text-sm leading-6 text-[#9CA3AF]">
                  Jodhadih More, Chas
                  <br />
                  Near Gurudwara
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#5EE7F2]/15 bg-[#5EE7F2]/[0.06] text-[#5EE7F2]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.3-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+919123231968" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                    +91 91232 19168
                  </a>
                  <a href="tel:+917061820742" className="text-sm text-[#9CA3AF] transition-colors hover:text-white">
                    +91 70618 20742
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#5EE7F2]/15 bg-[#5EE7F2]/[0.06] text-[#5EE7F2]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 6 9 7 9-7" />
                  </svg>
                </div>
                <a
                  href="mailto:golu820753@gmail.com"
                  className="mt-1.5 block break-all text-sm text-[#9CA3AF] transition-colors hover:text-white"
                >
                  golu820753@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}
        <div className="mt-12 border-t border-white/10 pt-6 sm:mt-14">
          <div className="flex flex-col gap-3 text-xs text-[#6B7280] sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {CURRENT_YEAR} Golu Camera Rental House. All rights reserved.
            </p>

            <p className="flex items-center gap-1.5">
              Designed & Developed by
              <span className="font-medium text-[#9CA3AF] transition-colors hover:text-[#5EE7F2]">
                Horizon
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}