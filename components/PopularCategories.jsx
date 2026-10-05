import Link from "next/link";
import { equipment } from "@/data/equipment";

/* =====================================================
   CATEGORY META — display name + tagline per category
   The image and count come from the equipment data
====================================================== */

const categoryMeta = [
  {
    key: "Cameras",
    name: "Cameras",
    tagline: "Full-frame, mirrorless & DSLR bodies",
  },
  {
    key: "Lenses",
    name: "Lenses",
    tagline: "Primes, zooms & cinema glass",
  },
  {
    key: "Gimbals",
    name: "Gimbals",
    tagline: "Stabilizers for smooth video",
  },
  {
    key: "Drones",
    name: "Drones",
    tagline: "Aerial photo & video gear",
  },
  {
    key: "Lighting",
    name: "Lighting",
    tagline: "LED kits for studio & location",
  },
];

/* =====================================================
   BUILD CATEGORIES FROM EQUIPMENT DATA
   - pulls the first image of each category
   - counts total items per category
====================================================== */

function buildCategories() {
  return categoryMeta.map((meta) => {
    const items = equipment.filter((item) => item.category === meta.key);
    const firstItem = items[0];

    return {
      ...meta,
      image: firstItem?.images?.[0] ?? "",
      alt: firstItem?.name
        ? `${firstItem.name} available for rental`
        : `${meta.name} available for rental`,
      count: items.length,
    };
  });
}

export default function PopularCategories() {
  const categories = buildCategories();

  return (
    <section className="relative bg-white py-16 text-[#111827] sm:py-20 lg:py-24">
      {/* Subtle background accents */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(45% 55% at 12% 12%, rgba(59,130,246,0.05), transparent 60%), radial-gradient(45% 55% at 88% 88%, rgba(94,231,242,0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
            Explore Our Gear
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#111827] sm:text-4xl lg:text-5xl">
            Popular Categories
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6b7280] sm:text-base">
            Explore our most rented equipment categories and find the right
            gear for your next project.
          </p>
        </div>

        {/* =====================================================
            CATEGORY GRID
        ====================================================== */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.key.toLowerCase()}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#3b82f6]/30 hover:shadow-[0_18px_40px_-12px_rgba(59,130,246,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2"
            >
              {/* Top accent sweep on hover */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{
                  background:
                    "linear-gradient(to right, #3b82f6, #5EE7F2)",
                }}
                aria-hidden="true"
              />

              {/* =============================================
                  IMAGE AREA
              ============================================= */}

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-white via-white to-slate-50">
                {/* Soft radial glow behind image */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 45%, rgba(59,130,246,0.10), transparent 70%)",
                  }}
                />

                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.06] sm:p-5"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-[#9CA3AF]">
                    No image
                  </div>
                )}

                {/* Item count badge */}
                <span className="absolute right-2.5 top-2.5 z-10 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#111827] shadow-sm backdrop-blur-sm">
                  {category.count}+ {category.count === 1 ? "item" : "items"}
                </span>
              </div>

              {/* =============================================
                  CARD CONTENT
              ============================================= */}

              <div className="flex flex-1 flex-col justify-center px-4 pb-5 pt-3">
                <h3 className="text-center text-sm font-semibold tracking-[-0.01em] text-[#111827] transition-colors duration-300 group-hover:text-[#2563eb] sm:text-[15px]">
                  {category.name}
                </h3>

                <p className="mt-1 text-center text-[11px] leading-4 text-[#9ca3af] sm:text-xs">
                  {category.tagline}
                </p>

                {/* Hover "Browse" cue */}
                <div className="mt-3 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2563eb]">
                    Browse
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* =====================================================
            VIEW ALL CTA
        ====================================================== */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#111827]/15 bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition-all duration-300 hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white hover:shadow-[0_10px_30px_-8px_rgba(37,99,235,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2"
          >
            View All Equipment
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}