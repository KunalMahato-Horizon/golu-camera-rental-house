"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { equipment } from "@/data/equipment";

/* =====================================================
   NAV ITEMS — Browse Gear has a dropdown
====================================================== */

const navItems = [
  { name: "Home", href: "/" },
  { name: "Browse Gear", href: "/products", hasDropdown: true },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

/* =====================================================
   CATEGORIES — pulled from equipment data
====================================================== */

const categoryOrder = ["Cameras", "Lenses", "Gimbals", "Drones", "Lighting"];

const categories = categoryOrder.map((name) => {
  const items = equipment.filter((item) => item.category === name);
  return {
    name,
    href: `/products?category=${name.toLowerCase()}`,
    count: items.length,
  };
});

/* =====================================================
   ROTATING ANNOUNCEMENTS
====================================================== */

const announcements = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-3 w-3"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m5 12 4.5 4.5L19 7"
        />
      </svg>
    ),
    text: "Booking open for this week · No booking fees",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-3 w-3"
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
    text: "Local pickup in Chas · Same-day available",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-3 w-3"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 7v5l3 2"
        />
      </svg>
    ),
    text: "Fast replies on WhatsApp · Usually within 5 minutes",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [mobileBrowseOpen, setMobileBrowseOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);

  const pathname = usePathname();
  const { totalItems } = useCart();

  const browseRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const prevTotalItems = useRef(totalItems);

  /* ==========================================
     SCROLL STATE
  ========================================== */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ==========================================
     LOCK BODY SCROLL WHEN MOBILE MENU OPEN
  ========================================== */

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* ==========================================
     ROTATING ANNOUNCEMENTS
  ========================================== */

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setAnnouncementIndex(
        (current) => (current + 1) % announcements.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ==========================================
     CLOSE DROPDOWN ON ROUTE CHANGE
  ========================================== */

  useEffect(() => {
    setBrowseOpen(false);
    setMobileMenuOpen(false);
    setMobileBrowseOpen(false);
  }, [pathname]);

  /* ==========================================
     ESCAPE KEY CLOSES DROPDOWN + MOBILE MENU
  ========================================== */

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setBrowseOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ==========================================
     CLICK OUTSIDE CLOSES DROPDOWN
  ========================================== */

  useEffect(() => {
    const onClick = (e) => {
      if (
        browseOpen &&
        browseRef.current &&
        !browseRef.current.contains(e.target)
      ) {
        setBrowseOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [browseOpen]);

  /* ==========================================
     CART PULSE ON ITEM ADD
  ========================================== */

  useEffect(() => {
    if (totalItems > prevTotalItems.current) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 700);
      return () => clearTimeout(timer);
    }
    prevTotalItems.current = totalItems;
  }, [totalItems]);

  /* ==========================================
     HELPERS
  ========================================== */

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openCart = () => {
    setMobileMenuOpen(false);
    setCartOpen(true);
  };

  const openBrowseMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setBrowseOpen(true);
  };

  const closeBrowseMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setBrowseOpen(false), 120);
  };

  return (
    <>
      {/* =====================================================
          SKIP LINK
      ====================================================== */}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#5EE7F2] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#090A0D] focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* =====================================================
          ANNOUNCEMENT BAR (scrolls away with page)
      ====================================================== */}

      <div className="relative border-b border-white/[0.06] bg-[#090A0D]">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(60% 100% at 20% 50%, rgba(59,130,246,0.10), transparent 70%), radial-gradient(60% 100% at 80% 50%, rgba(239,68,68,0.08), transparent 70%)",
          }}
        />

        <div className="relative mx-auto flex h-9 max-w-7xl items-center justify-center px-5 sm:px-8 lg:px-10">
          <div
            key={announcementIndex}
            className="animate-announcement flex items-center gap-2 text-[11px] font-medium tracking-wide text-white/70 sm:text-xs"
          >
            <span className="text-[#5EE7F2]">
              {announcements[announcementIndex].icon}
            </span>
            <span>{announcements[announcementIndex].text}</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header
        className={`sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-[#0B1120]/95 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.6)]"
            : "bg-[#0B1120]/85"
        }`}
      >
        {/* Bottom accent line */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
          style={{
            background: "linear-gradient(to right, #ef4444 0%, #3b82f6 100%)",
          }}
          aria-hidden="true"
        />

        {/* ===================================================
            MAIN HEADER ROW
        ==================================================== */}

        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-300 sm:px-8 lg:px-10 ${
            scrolled ? "h-[64px]" : "h-[72px]"
          }`}
        >
          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.05] transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.08]">
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.4), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <span className="relative text-sm font-bold tracking-tight text-white">
                GC
              </span>
            </div>

            <div className="hidden flex-col sm:flex">
              <p className="text-sm font-bold leading-tight tracking-[0.08em] text-white">
                GOLU CAMERA
              </p>
              <p className="mt-0.5 text-[9px] font-medium uppercase leading-tight tracking-[0.2em] text-[#9ca3af]">
                Rental House
              </p>
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAV
          ================================================== */}

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);

              // Browse Gear — dropdown
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.href}
                    ref={browseRef}
                    className="relative"
                    onMouseEnter={openBrowseMenu}
                    onMouseLeave={closeBrowseMenu}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup="true"
                      aria-expanded={browseOpen}
                      onFocus={openBrowseMenu}
                      className={`group relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        active
                          ? "text-white"
                          : "text-[#cbd5e1] hover:text-white"
                      }`}
                    >
                      {item.name}

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-3 w-3 transition-transform duration-300 ${
                          browseOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m6 9 6 6 6-6"
                        />
                      </svg>

                      <span
                        className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full transition-all duration-300 ${
                          active || browseOpen
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-60"
                        }`}
                        style={{
                          background:
                            "linear-gradient(to right, #ef4444, #3b82f6)",
                        }}
                        aria-hidden="true"
                      />
                    </Link>

                    {/* Dropdown panel */}
                    <div
                      className={`absolute left-1/2 top-[calc(100%+8px)] w-72 -translate-x-1/2 transition-all duration-200 ${
                        browseOpen
                          ? "visible opacity-100 translate-y-0"
                          : "invisible opacity-0 -translate-y-1"
                      }`}
                    >
                      {/* Small caret */}
                      <div
                        className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-white/10 bg-[#0B1120]"
                        aria-hidden="true"
                      />

                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120] p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]">
                        {/* Top accent */}
                        <div
                          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                          style={{
                            background:
                              "linear-gradient(to right, #ef4444 0%, #3b82f6 100%)",
                          }}
                          aria-hidden="true"
                        />

                        <div className="px-3 pb-2 pt-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                            Categories
                          </p>
                        </div>

                        <ul className="space-y-0.5">
                          {categories.map((category) => (
                            <li key={category.name}>
                              <Link
                                href={category.href}
                                className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.05]"
                              >
                                <span className="flex items-center gap-3">
                                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#3b82f6]/20 bg-[#3b82f6]/[0.08] text-[#60a5fa] transition-all duration-200 group-hover/item:border-[#3b82f6]/40 group-hover/item:bg-[#3b82f6]/20">
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                      className="h-3.5 w-3.5"
                                      aria-hidden="true"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 7h18M3 12h18M3 17h10"
                                      />
                                    </svg>
                                  </span>
                                  <span className="text-sm font-medium text-[#cbd5e1] transition-colors group-hover/item:text-white">
                                    {category.name}
                                  </span>
                                </span>

                                <span className="text-[10px] font-medium text-white/30 transition-colors group-hover/item:text-[#5EE7F2]">
                                  {category.count}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-1 border-t border-white/[0.06] pt-1">
                          <Link
                            href="/products"
                            className="group/all flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#5EE7F2]/[0.08]"
                          >
                            <span className="text-[#5EE7F2]">
                              View All Equipment
                            </span>
                            <span className="text-[#5EE7F2] transition-transform duration-300 group-hover/all:translate-x-0.5">
                              →
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Regular nav item
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    active ? "text-white" : "text-[#cbd5e1] hover:text-white"
                  }`}
                >
                  {item.name}

                  <span
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full transition-all duration-300 ${
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                    style={{
                      background:
                        "linear-gradient(to right, #ef4444, #3b82f6)",
                    }}
                    aria-hidden="true"
                  />

                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-lg bg-white/[0.05]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* =================================================
              RIGHT SIDE ACTIONS
          ================================================== */}

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop WhatsApp CTA */}
            <div className="hidden md:block">
              <WhatsAppButton
                variant="solid"
                size="sm"
                label="WhatsApp"
                message="Hi! I'd like to check camera gear availability. Can you help?"
                className="!w-auto"
              />
            </div>

            {/* Cart button */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart with ${totalItems} ${
                totalItems === 1 ? "item" : "items"
              }`}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-lg text-white transition-all duration-300 hover:bg-white/[0.05] hover:text-[#60a5fa] ${
                cartPulse ? "animate-cart-pulse" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>

              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3b82f6] px-1 text-[9px] font-bold text-white shadow-[0_0_0_2px_#0B1120] ring-1 ring-[#60a5fa]/50">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((c) => !c)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-95 md:hidden"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ===================================================
            MOBILE MENU
        ==================================================== */}

        <div
          className={`overflow-hidden border-t bg-[#0B1120]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
            mobileMenuOpen
              ? "max-h-[85vh] overflow-y-auto border-white/[0.06] opacity-100"
              : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <nav className="mx-auto max-w-7xl px-5 pb-6 pt-4 sm:px-8">
            <div className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);

                // Browse Gear — expandable with categories
                if (item.hasDropdown) {
                  return (
                    <div key={item.href}>
                      <button
                        type="button"
                        onClick={() => setMobileBrowseOpen((c) => !c)}
                        aria-expanded={mobileBrowseOpen}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                          active
                            ? "border border-white/20 bg-white/[0.06] text-white"
                            : "border border-transparent text-[#cbd5e1] hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {active && (
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{
                                background:
                                  "linear-gradient(to right, #ef4444, #3b82f6)",
                              }}
                              aria-hidden="true"
                            />
                          )}
                          {item.name}
                        </span>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`h-4 w-4 text-white/40 transition-transform duration-300 ${
                            mobileBrowseOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </button>

                      {/* Sub-categories */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          mobileBrowseOpen
                            ? "max-h-[400px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="mt-1 space-y-0.5 border-l-2 border-[#3b82f6]/30 pl-3 ml-4">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-[#cbd5e1] transition-colors hover:bg-white/[0.04] hover:text-white"
                            >
                              <span>{category.name}</span>
                              <span className="text-[10px] text-white/30">
                                {category.count}
                              </span>
                            </Link>
                          ))}

                          <Link
                            href="/products"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-[#5EE7F2] transition-colors hover:bg-[#5EE7F2]/[0.08]"
                          >
                            <span>View All Equipment</span>
                            <span>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Regular mobile item
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center justify-between rounded-lg px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                      active
                        ? "border border-white/20 bg-white/[0.06] text-white"
                        : "border border-transparent text-[#cbd5e1] hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {active && (
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background:
                              "linear-gradient(to right, #ef4444, #3b82f6)",
                          }}
                          aria-hidden="true"
                        />
                      )}
                      {item.name}
                    </span>

                    <span
                      className={`text-lg transition-all duration-300 ${
                        active
                          ? "translate-x-0 text-[#60a5fa]"
                          : "text-white/25 group-hover:translate-x-0.5 group-hover:text-white/50"
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile footer CTA */}
            <div className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
              <WhatsAppButton
                variant="solid"
                size="md"
                label="Chat on WhatsApp"
                message="Hi! I'd like to rent some camera gear. Can you help?"
                className="w-full"
              />

              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#5EE7F2]/40 hover:bg-[#5EE7F2]/10"
              >
                Browse Full Catalog
                <span className="text-[#5EE7F2]">→</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* =====================================================
          CART DRAWER
      ====================================================== */}

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}