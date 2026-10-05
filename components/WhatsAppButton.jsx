"use client";

import { useMemo } from "react";

const WHATSAPP_NUMBER = "919123231968";
const DEFAULT_MESSAGE =
  "Hi! I'd like to rent some camera gear. Can you help me pick?";

/**
 * Reusable WhatsApp CTA button.
 *
 * Props:
 *  - message: string — custom pre-filled message (falls back to a default)
 *  - variant: "solid" | "outline" — visual style
 *  - size: "sm" | "md" | "lg" — button height & padding
 *  - label: string — button text (default "Chat on WhatsApp")
 *  - className: string — extra classes
 */
export default function WhatsAppButton({
  message = DEFAULT_MESSAGE,
  variant = "outline",
  size = "md",
  label = "Chat on WhatsApp",
  className = "",
}) {
  const href = useMemo(
    () =>
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    [message]
  );

  const sizeClasses = {
    sm: "min-h-10 px-4 text-xs gap-2",
    md: "min-h-12 px-6 text-sm gap-2.5",
    lg: "min-h-13 px-7 text-sm gap-2.5",
  }[size];

  const variantClasses =
    variant === "solid"
      ? "bg-[#25D366] text-white hover:bg-[#1EBE5A] hover:shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)]"
      : "border border-white/15 bg-white/[0.04] text-white backdrop-blur-sm hover:border-[#25D366]/50 hover:bg-[#25D366]/10";

  const iconColor = variant === "solid" ? "text-white" : "text-[#25D366]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex w-full items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120] sm:w-auto ${sizeClasses} ${variantClasses} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`h-[18px] w-[18px] ${iconColor}`}
        aria-hidden="true"
      >
        <path d="M20.5 3.5A11.9 11.9 0 0 0 12.03 0C5.45 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.95L.03 24l6.27-1.64a11.9 11.9 0 0 0 5.73 1.46h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.47-8.39ZM12.04 21.85h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.86 9.86 0 0 1-1.52-5.3C2.15 6.48 6.58 2.05 12.04 2.05c2.65 0 5.14 1.03 7.01 2.9a9.84 9.84 0 0 1 2.9 7c0 5.47-4.44 9.9-9.91 9.9Zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.69.15-.2.3-.79.97-.97 1.17-.18.2-.36.23-.66.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.31.3-.51.1-.2.05-.38-.03-.54-.08-.15-.69-1.66-.94-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.51.08-.77.38-.26.3-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.15 4.99 4.42.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.18-1.42-.08-.13-.28-.2-.58-.35Z" />
      </svg>
      {label}
    </a>
  );
}