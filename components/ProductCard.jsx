"use client";

import { useCart } from "@/context/CartContext";

/* =====================================================
   Shared: WhatsApp icon (small, reused in both views)
====================================================== */

const WHATSAPP_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M20.5 3.5A11.9 11.9 0 0 0 12.03 0C5.45 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.95L.03 24l6.27-1.64a11.9 11.9 0 0 0 5.73 1.46h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.47-8.39ZM12.04 21.85h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.86 9.86 0 0 1-1.52-5.3C2.15 6.48 6.58 2.05 12.04 2.05c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.69.15-.2.3-.79.97-.97 1.17-.18.2-.36.23-.66.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.31.3-.51.1-.2.05-.38-.03-.54-.08-.15-.69-1.66-.94-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.51.08-.77.38-.26.3-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.15 4.99 4.42.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.18-1.42-.08-.13-.28-.2-.58-.35Z" />
  </svg>
);

const CART_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
);

const CHECK_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4.5 4.5L19 7" />
  </svg>
);

export default function ProductCard({ product, onDetails, view = "grid" }) {
  const { addToCart, items = [] } = useCart();

  /* ==========================================
     IN-CART STATE
  ========================================== */

  const isInCart = items.some((item) => item.id === product.id);

  /* ==========================================
     WHATSAPP LINK — contextual per product
  ========================================== */

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in renting the ${product.name}. Could you share availability and rental details?`
  );
  const whatsappUrl = `https://wa.me/919123231968?text=${whatsappMessage}`;

  /* ==========================================
     HANDLERS
  ========================================== */

  const handleAddToCart = (e) => {
    e?.stopPropagation();
    addToCart(product);
  };

  const handleDetails = (e) => {
    e?.stopPropagation();
    onDetails?.(e);
  };

  const handleKeyDetails = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onDetails?.(e);
    }
  };

  const shortDescription = product.tagline || product.description;

  /* ==========================================
     SHARED: IMAGE BLOCK
  ========================================== */

  const imageBlock = (aspectClasses = "aspect-[4/3]") => (
    <button
      type="button"
      onClick={handleDetails}
      onKeyDown={handleKeyDetails}
      aria-label={`View details for ${product.name}`}
      className={`group/img relative block w-full overflow-hidden bg-gradient-to-br from-white via-white to-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3b82f6] ${aspectClasses}`}
    >
      {/* Radial glow behind product */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(59,130,246,0.08), transparent 70%)",
        }}
      />

      {product.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-5 transition-transform duration-700 ease-out group-hover/img:scale-[1.06]"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-xs text-[#9CA3AF]">
          No image
        </span>
      )}

      {/* Featured badge */}
      {product.featured && (
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full border border-[#FACC15]/40 bg-[#0B1120]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FACC15] backdrop-blur-sm">
          <span className="h-1 w-1 rounded-full bg-[#FACC15]" />
          Featured
        </span>
      )}

      {/* Hover hint */}
      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-1 rounded-full border border-white/20 bg-[#0B1120]/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        Quick view
      </span>
    </button>
  );

  /* ==========================================
     SHARED: ACTIONS ROW
  ========================================== */

  const actionsBlock = () => (
    <div className="grid grid-cols-[1fr_auto] gap-2">
      {/* Primary — Add to Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        aria-label={
          isInCart
            ? `${product.name} is in your cart. Add another.`
            : `Add ${product.name} to cart`
        }
        className={`group/cart flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          isInCart
            ? "border border-[#5EE7F2]/40 bg-[#5EE7F2]/10 text-[#0B1120] focus-visible:ring-[#5EE7F2]"
            : "bg-[#0B1120] text-white hover:bg-[#0B1120]/90 hover:shadow-[0_10px_25px_-8px_rgba(11,17,32,0.6)] focus-visible:ring-[#3b82f6]"
        }`}
      >
        <span
          className={`transition-transform duration-300 ${
            isInCart ? "" : "group-hover/cart:scale-110"
          }`}
        >
          {isInCart ? CHECK_ICON : CART_ICON}
        </span>
        <span>{isInCart ? "In Cart" : "Add to Cart"}</span>
      </button>

      {/* Secondary — WhatsApp (icon only) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message us about ${product.name} on WhatsApp`}
        title="Ask about availability on WhatsApp"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#25D366]/30 bg-[#25D366]/[0.08] text-[#25D366] transition-all duration-300 hover:border-[#25D366]/50 hover:bg-[#25D366]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        {WHATSAPP_ICON}
      </a>
    </div>
  );

  /* ==========================================
     LIST VIEW
  ========================================== */

  if (view === "list") {
    return (
      <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:border-[#3b82f6]/30 hover:shadow-[0_18px_40px_-12px_rgba(59,130,246,0.20)] sm:flex-row">
        {/* Accent sweep */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{
            background: "linear-gradient(to right, #3b82f6, #5EE7F2)",
          }}
          aria-hidden="true"
        />

        {/* Image — fixed width on desktop */}
        <div className="shrink-0 sm:w-52 lg:w-60">
          {imageBlock("aspect-[4/3] sm:h-full sm:aspect-auto")}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3b82f6]">
              {product.category}
            </p>

            <h3 className="mt-1.5 text-lg font-bold leading-6 tracking-[-0.01em] text-[#111827] sm:text-xl">
              {product.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6B7280]">
              {shortDescription}
            </p>
          </div>

          <div className="mt-5 max-w-md">{actionsBlock()}</div>
        </div>
      </article>
    );
  }

  /* ==========================================
     GRID VIEW (default)
  ========================================== */

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#3b82f6]/30 hover:shadow-[0_18px_40px_-12px_rgba(59,130,246,0.25)]">
      {/* Top accent sweep on hover */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{
          background: "linear-gradient(to right, #3b82f6, #5EE7F2)",
        }}
        aria-hidden="true"
      />

      {/* Image */}
      {imageBlock("aspect-[4/3]")}

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#3b82f6]">
            {product.category}
          </p>

          <h3 className="mt-1.5 text-base font-bold leading-6 tracking-[-0.01em] text-[#111827] sm:text-[17px]">
            {product.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-[#6B7280]">
            {shortDescription}
          </p>
        </div>

        <div className="mt-4">{actionsBlock()}</div>
      </div>
    </article>
  );
}