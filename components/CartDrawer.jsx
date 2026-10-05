"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({
  isOpen,
  onClose,
}) {
  const {
    cartItems,
    totalItems,
    removeFromCart,
  } = useCart();

  // ==========================================
  // WHATSAPP BOOKING
  // ==========================================

  const handleWhatsAppBooking = () => {
    if (cartItems.length === 0) {
      return;
    }

    const equipmentList = cartItems
      .map(
        (item) =>
          `• ${item.product.name} (${item.product.category})`
      )
      .join("\n");

    const message = `Hi, I am interested in renting the following equipment:

${equipmentList}

Please share the availability and rental details.

Thank you.`;

    const whatsappUrl = `https://wa.me/919123231968?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  // ==========================================
  // BODY SCROLL LOCK
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // ==========================================
  // ESCAPE KEY
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // ==========================================
  // DON'T RENDER WHEN CLOSED
  // ==========================================

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100]">

      {/* ==========================================
          BACKDROP
      ========================================== */}

      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-[2px]"
      />

      {/* ==========================================
          DRAWER
      ========================================== */}

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-5">

          <div>
            <h2 className="text-lg font-bold text-[#111827]">
              Your Rental Cart
            </h2>

            <p className="mt-1 text-xs text-[#6B7280]">
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} selected
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition-colors hover:bg-[#F3F4F6] hover:text-[#111827]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>

        </div>

        {/* ==========================================
            CONTENT
        ========================================== */}

        <div className="flex-1 overflow-y-auto">

          {/* ==========================================
              EMPTY CART
          ========================================== */}

          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F4F6]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-7 w-7 text-[#9CA3AF]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"
                  />

                  <circle cx="10" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#111827]">
                Your cart is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#6B7280]">
                Add equipment from our catalog to start your rental inquiry.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-lg bg-[#111827] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1F2937]"
              >
                Browse Equipment
              </button>

            </div>
          ) : (

            /* ==========================================
               CART ITEMS
            ========================================== */

            <div className="divide-y divide-[#F3F4F6]">

              {cartItems.map((item) => {
                const product = item.product;

                return (
                  <div
                    key={product.id}
                    className="flex gap-4 p-5"
                  >

                    {/* ==========================================
                        PRODUCT IMAGE
                    ========================================== */}

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F9FAFB]">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    {/* ==========================================
                        PRODUCT DETAILS
                    ========================================== */}

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <p className="text-sm font-bold leading-5 text-[#111827]">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs font-medium text-[#3B82F6]">
                            {product.category}
                          </p>
                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(product.id)
                          }
                          aria-label={`Remove ${product.name}`}
                          className="shrink-0 text-[#9CA3AF] transition-colors hover:text-[#DC2626]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 7h16"
                            />

                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 11v6M14 11v6"
                            />

                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 7l1 14h10l1-14M9 7V4h6v3"
                            />
                          </svg>
                        </button>

                      </div>

                      <p className="mt-3 text-xs text-[#6B7280]">
                        Rental pricing available on request
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* ==========================================
            FOOTER / ACTIONS
        ========================================== */}

        {cartItems.length > 0 && (
          <div className="border-t border-[#E5E7EB] bg-white p-5">

            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="mb-4 rounded-xl bg-[#F9FAFB] p-4">

              <div className="flex items-center justify-between">

                <span className="text-sm text-[#6B7280]">
                  Equipment
                </span>

                <span className="text-sm font-semibold text-[#111827]">
                  {totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"}
                </span>

              </div>

              <div className="mt-2 flex items-center justify-between">

                <span className="text-sm text-[#6B7280]">
                  Pricing
                </span>

                <span className="text-sm font-semibold text-[#111827]">
                  On request
                </span>

              </div>

            </div>

            {/* ==========================================
                WHATSAPP BUTTON
            ========================================== */}

            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20BD5A] focus:outline-none focus:ring-2 focus:ring-green-500/30"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>

              Book via WhatsApp
            </button>

          </div>
        )}

      </aside>
    </div>
  );
}