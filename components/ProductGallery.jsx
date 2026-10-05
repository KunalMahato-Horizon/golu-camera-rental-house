"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ product }) {
  const [activeImage, setActiveImage] = useState(0);

  const images = product.images || [];

  if (!images.length) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-400">
        No image available
      </div>
    );
  }

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        <Image
          src={images[activeImage]}
          alt={`${product.name} - view ${activeImage + 1}`}
          fill
          priority
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.02] sm:p-10"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Previous */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 18l-6-6 6-6"
                />
              </svg>
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 18l6-6-6-6"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-slate-900/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
            {activeImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-slate-50 transition ${
                activeImage === index
                  ? "border-slate-900"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                fill
                className="object-contain p-2"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}