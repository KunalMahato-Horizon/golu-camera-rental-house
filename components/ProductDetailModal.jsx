"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";

/* =====================================================
   RENTAL REQUIREMENTS
====================================================== */

const RENTAL_REQUIREMENTS = [
  "Valid Government ID (Aadhar / PAN / Driving License)",
  "Address Proof",
  "Contact Details (Phone & Email)",
];

/* =====================================================
   SHARED ICONS
====================================================== */

const WhatsAppIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M20.5 3.5A11.9 11.9 0 0 0 12.03 0C5.45 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.95L.03 24l6.27-1.64a11.9 11.9 0 0 0 5.73 1.46h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.47-8.39ZM12.04 21.85h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.86 9.86 0 0 1-1.52-5.3C2.15 6.48 6.58 2.05 12.04 2.05c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.69.15-.2.3-.79.97-.97 1.17-.18.2-.36.23-.66.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.31.3-.51.1-.2.05-.38-.03-.54-.08-.15-.69-1.66-.94-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.51.08-.77.38-.26.3-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.15 4.99 4.42.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.18-1.42-.08-.13-.28-.2-.58-.35Z" />
  </svg>
);

const CartIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 4h1.5l1.2 11h10.8l1.2-8H7"
    />
    <circle cx="9" cy="19" r="1.2" />
    <circle cx="17" cy="19" r="1.2" />
  </svg>
);

const CheckIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4.5 4.5L19 7" />
  </svg>
);

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart, items = [] } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const modalRef = useRef(null);
  const imageViewerOpenRef = useRef(false);

  /* ==========================================
     KEEP REF IN SYNC WITH STATE
     (so escape handler doesn't need to re-register)
  ========================================== */

  useEffect(() => {
    imageViewerOpenRef.current = isImageViewerOpen;
  }, [isImageViewerOpen]);

  /* ==========================================
     INITIALISE ON PRODUCT CHANGE
  ========================================== */

  useEffect(() => {
    if (!product) return;
    setActiveImage(0);
    setIsImageViewerOpen(false);
    setJustAdded(false);
  }, [product]);

  /* ==========================================
     BODY SCROLL LOCK (only while modal mounted)
  ========================================== */

  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [product]);

  /* ==========================================
     ESCAPE HANDLER (single registration)
  ========================================== */

  useEffect(() => {
    if (!product) return;

    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      // If full-screen viewer is open, close that first
      if (imageViewerOpenRef.current) {
        setIsImageViewerOpen(false);
      } else {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [product, onClose]);

  /* ==========================================
     FOCUS TRAP
  ========================================== */

  useEffect(() => {
    if (!product || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const handleTab = (event) => {
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        modal.querySelectorAll(focusableSelector)
      ).filter((el) => el.offsetParent !== null);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    modal.addEventListener("keydown", handleTab);

    // Focus the modal itself so Tab starts inside
    const firstFocusable = modal.querySelector(focusableSelector);
    firstFocusable?.focus();

    return () => modal.removeEventListener("keydown", handleTab);
  }, [product]);

  /* ==========================================
     SAFE EARLY RETURN (after hooks)
  ========================================== */

  if (!product) return null;

  /* ==========================================
     DERIVED
  ========================================== */

  const images = product.images?.length
    ? product.images
    : ["/images/placeholder.jpg"];

  const currentImage = images[activeImage] || images[0];
  const isInCart = items.some((item) => item.id === product.id);

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in renting the ${product.name}. Could you share availability and rental details?`
  );
  const whatsappUrl = `https://wa.me/919123231968?text=${whatsappMessage}`;

  /* ==========================================
     HANDLERS
  ========================================== */

  const showPreviousImage = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <>
      {/* ==========================================
          MODAL BACKDROP
      ========================================== */}

      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-5 lg:p-6"
        onMouseDown={handleBackdropClick}
      >
        {/* ==========================================
            MODAL
        ========================================== */}

        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#F8FAFC] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]"
          onMouseDown={(event) => event.stopPropagation()}
        >
          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="relative flex shrink-0 items-start justify-between gap-5 border-b border-[#E5E7EB] bg-white px-5 py-4 sm:px-7 sm:py-5">
            {/* Top accent line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, #ef4444 0%, #3b82f6 100%)",
              }}
              aria-hidden="true"
            />

            <div className="min-w-0 flex-1">
              {/* Category + Featured badges */}
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2563eb]">
                  <span className="h-1 w-1 rounded-full bg-[#3b82f6]" />
                  {product.category}
                </span>

                {product.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#FACC15]/40 bg-[#FACC15]/[0.10] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#A16207]">
                    <span className="h-1 w-1 rounded-full bg-[#FACC15]" />
                    Featured
                  </span>
                )}
              </div>

              <h2
                id="product-modal-title"
                className="text-xl font-bold tracking-[-0.01em] text-[#111827] sm:text-2xl"
              >
                {product.name}
              </h2>

              {product.tagline && (
                <p className="mt-1 text-sm text-[#6B7280]">
                  {product.tagline}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition-all duration-200 hover:border-[#111827] hover:bg-[#111827] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>
          </div>

          {/* ==========================================
              SCROLLABLE CONTENT
          ========================================== */}

          <div className="overflow-y-auto">
            <div className="grid grid-cols-1 gap-6 p-5 sm:p-7 lg:grid-cols-2 lg:gap-8">
              {/* ==========================================
                  LEFT — MEDIA
              ========================================== */}

              <div>
                <div className="group/media relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-white via-white to-slate-50 p-5 sm:p-7">
                  {/* Radial glow */}
                  <span
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                    style={{
                      background:
                        "radial-gradient(60% 60% at 50% 50%, rgba(94,231,242,0.08), transparent 70%)",
                    }}
                  />

                  {/* Image — cross-fade on change */}
                  <img
                    key={currentImage}
                    src={currentImage}
                    alt={`${product.name} — image ${activeImage + 1}`}
                    className="animate-image-fade h-full w-full object-contain"
                  />

                  {/* Prev */}
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/95 text-[#374151] shadow-sm transition-all duration-200 hover:border-[#111827] hover:bg-[#111827] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
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
                          d="M15 18l-6-6 6-6"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Next */}
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={showNextImage}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/95 text-[#374151] shadow-sm transition-all duration-200 hover:border-[#111827] hover:bg-[#111827] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
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
                          d="M9 18l6-6-6-6"
                        />
                      </svg>
                    </button>
                  )}

                  {/* View Full */}
                  <button
                    type="button"
                    onClick={() => setIsImageViewerOpen(true)}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3.5 py-2 text-xs font-semibold text-[#111827] shadow-md backdrop-blur transition-all duration-200 hover:bg-[#111827] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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
                        d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                      />
                    </svg>
                    View Full
                  </button>
                </div>

                {/* Counter + hint */}
                {images.length > 1 && (
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-medium text-[#6B7280]">
                      Image{" "}
                      <span className="font-semibold text-[#111827]">
                        {activeImage + 1}
                      </span>{" "}
                      of {images.length}
                    </span>
                    <span className="hidden text-[#9CA3AF] sm:block">
                      Click a thumbnail to preview
                    </span>
                  </div>
                )}

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-2.5">
                    {images.map((image, index) => {
                      const isActive = activeImage === index;
                      return (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() => setActiveImage(index)}
                          aria-label={`View image ${index + 1}`}
                          aria-current={isActive ? "true" : undefined}
                          className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border bg-white p-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-1 ${
                            isActive
                              ? "border-[#0891A3] ring-2 ring-[#5EE7F2]/40"
                              : "border-[#E5E7EB] hover:border-[#9CA3AF]"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} — thumbnail ${index + 1}`}
                            className="h-full w-full object-contain"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ==========================================
                  RIGHT — INFORMATION
              ========================================== */}

              <div className="space-y-5">
                {/* Description */}
                <p className="text-sm leading-6 text-[#4B5563] sm:text-[15px]">
                  {product.description}
                </p>

                {/* Highlights */}
                {product.highlights?.length > 0 && (
                  <div>
                    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                      Highlights
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {product.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#3b82f6]/15 bg-[#3b82f6]/[0.06] px-2.5 py-1 text-xs font-medium text-[#2563eb]"
                        >
                          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#3b82f6] text-white">
                            <CheckIcon className="h-2 w-2" />
                          </span>
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Availability */}
                <div className="flex items-center gap-2.5 rounded-xl border border-[#22C55E]/20 bg-[#22C55E]/[0.06] px-4 py-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
                  </span>
                  <span className="text-sm font-semibold text-[#15803D]">
                    Available for Rent
                  </span>
                </div>

                {/* Specifications */}
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                  <h3 className="text-sm font-bold tracking-[-0.01em] text-[#111827]">
                    Equipment Information
                  </h3>

                  <div className="mt-3 divide-y divide-[#F3F4F6]">
                    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
                      <span className="text-[#6B7280]">Category</span>
                      <span className="font-medium text-[#111827]">
                        {product.category}
                      </span>
                    </div>

                    {product.brand && (
                      <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
                        <span className="text-[#6B7280]">Brand</span>
                        <span className="font-medium text-[#111827]">
                          {product.brand}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
                      <span className="shrink-0 text-[#6B7280]">Model</span>
                      <span className="text-right font-medium text-[#111827]">
                        {product.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
                      <span className="text-[#6B7280]">Photos</span>
                      <span className="font-medium text-[#111827]">
                        {images.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rental Requirements */}
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                  <h3 className="text-sm font-bold tracking-[-0.01em] text-[#111827]">
                    Rental Requirements
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#6B7280]">
                    Deposit and rental terms are confirmed by our team before
                    booking.
                  </p>

                  <ul className="mt-3.5 space-y-2.5">
                    {RENTAL_REQUIREMENTS.map((requirement) => (
                      <li
                        key={requirement}
                        className="flex items-start gap-2.5 text-sm text-[#374151]"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/15 text-[#15803D]">
                          <CheckIcon className="h-2.5 w-2.5" />
                        </span>
                        <span className="leading-5">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              FOOTER ACTIONS
          ========================================== */}

          <div className="grid shrink-0 grid-cols-1 gap-3 border-t border-[#E5E7EB] bg-white p-4 sm:grid-cols-2 sm:p-5">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                justAdded
                  ? "bg-[#22C55E] text-white focus-visible:ring-[#22C55E]"
                  : isInCart
                  ? "border border-[#5EE7F2]/40 bg-[#5EE7F2]/10 text-[#0B1120] focus-visible:ring-[#5EE7F2]"
                  : "bg-[#0B1120] text-white hover:bg-[#0B1120]/90 hover:shadow-[0_10px_25px_-8px_rgba(11,17,32,0.6)] focus-visible:ring-[#3b82f6]"
              }`}
            >
              {justAdded ? (
                <>
                  <CheckIcon className="h-4 w-4" />
                  Added to Cart
                </>
              ) : isInCart ? (
                <>
                  <CheckIcon className="h-4 w-4" />
                  In Cart — Add Another
                </>
              ) : (
                <>
                  <CartIcon className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/[0.06] px-5 text-sm font-semibold text-[#15803D] transition-all duration-300 hover:border-[#25D366]/60 hover:bg-[#25D366]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>

      {/* ==========================================
          FULL IMAGE VIEWER
      ========================================== */}

      {isImageViewerOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsImageViewerOpen(false);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setIsImageViewerOpen(false)}
            aria-label="Close full image"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-200 hover:bg-white hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-200 hover:bg-white hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 18l-6-6 6-6"
                />
              </svg>
            </button>
          )}

          <img
            key={currentImage}
            src={currentImage}
            alt={`${product.name} — full view`}
            className="animate-image-fade max-h-[88vh] max-w-[92vw] object-contain"
          />

          {images.length > 1 && (
            <button
              type="button"
              onClick={showNextImage}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-200 hover:bg-white hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 18l6-6-6-6"
                />
              </svg>
            </button>
          )}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
            <span className="font-semibold">{activeImage + 1}</span>
            <span className="mx-1 opacity-60">/</span>
            {images.length}
          </p>
        </div>
      )}
    </>
  );
}