"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import { equipment } from "@/data/equipment";

const DEFAULT_FILTERS = {
  search: "",
  category: "all",
  sortBy: "name",
};

/* ==========================================
   URL PARAM NAMES — single source of truth
========================================== */

const PARAMS = {
  search: "q",
  category: "category",
  sortBy: "sort",
};

/* ==========================================
   VALID SORT VALUES — for URL sanitisation
========================================== */

const VALID_SORTS = ["name", "name-desc", "category"];

export default function ProductsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* ==========================================
     INITIALISE FILTERS FROM URL (once)
  ========================================== */

  const initialFilters = useMemo(() => {
    const urlCategory = searchParams.get(PARAMS.category);
    const urlSearch = searchParams.get(PARAMS.search);
    const urlSort = searchParams.get(PARAMS.sortBy);

    // Match category case-insensitively against real category names
    const matchedCategory = urlCategory
      ? equipment
          .map((item) => item.category)
          .find((cat) => cat.toLowerCase() === urlCategory.toLowerCase()) ||
        "all"
      : "all";

    // Sanitise sort value — reject anything not in the whitelist
    const safeSort =
      urlSort && VALID_SORTS.includes(urlSort) ? urlSort : "name";

    return {
      search: urlSearch || "",
      category: matchedCategory,
      sortBy: safeSort,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const [filters, setFilters] = useState(initialFilters);

  /* ==========================================
     VIEW MODE — grid vs list
  ========================================== */

  const [viewMode, setViewMode] = useState("grid");

  const gridRef = useRef(null);
  const isFirstRender = useRef(true);
  const isFirstUrlSync = useRef(true);

  /* ==========================================
     SYNC FILTERS → URL
     (so URLs are shareable + back/forward works)
  ========================================== */

  useEffect(() => {
    if (isFirstUrlSync.current) {
      isFirstUrlSync.current = false;
      return;
    }

    const params = new URLSearchParams();

    if (filters.search.trim()) {
      params.set(PARAMS.search, filters.search.trim());
    }
    if (filters.category !== "all") {
      params.set(PARAMS.category, filters.category.toLowerCase());
    }
    if (filters.sortBy !== "name") {
      params.set(PARAMS.sortBy, filters.sortBy);
    }

    const query = params.toString();
    const target = query ? `${pathname}?${query}` : pathname;

    // `replace` so we don't flood browser history with filter changes
    router.replace(target, { scroll: false });
  }, [filters, pathname, router]);

  /* ==========================================
     FILTER + SORT PIPELINE
  ========================================== */

  const filteredProducts = useMemo(() => {
    let result = [...equipment];

    // Search — name, category, tagline, description, brand
    const searchTerm = filters.search.trim().toLowerCase();
    if (searchTerm) {
      result = result.filter((product) => {
        const haystack = [
          product.name,
          product.category,
          product.tagline || "",
          product.description,
          product.brand || "",
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(searchTerm);
      });
    }

    // Category — case-insensitive match
    if (filters.category !== "all") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "category":
        result.sort((a, b) => {
          const catCompare = a.category.localeCompare(b.category);
          if (catCompare !== 0) return catCompare;
          return a.name.localeCompare(b.name);
        });
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [filters]);

  /* ==========================================
     SCROLL TO TOP OF RESULTS ON FILTER CHANGE
     (skips on mount to avoid jumping the page)
  ========================================== */

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (gridRef.current) {
      const y =
        gridRef.current.getBoundingClientRect().top + window.scrollY - 100; // offset for sticky header
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [filters.search, filters.category, filters.sortBy]);

  /* ==========================================
     ACTIVE FILTER CHIPS
  ========================================== */

  const activeFilters = useMemo(() => {
    const chips = [];

    if (filters.search.trim()) {
      chips.push({
        key: "search",
        label: `"${filters.search.trim()}"`,
        clear: () => setFilters((f) => ({ ...f, search: "" })),
      });
    }

    if (filters.category !== "all") {
      chips.push({
        key: "category",
        label: filters.category,
        clear: () => setFilters((f) => ({ ...f, category: "all" })),
      });
    }

    if (filters.sortBy !== "name") {
      const sortLabels = {
        "name-desc": "Name Z–A",
        category: "By category",
      };
      chips.push({
        key: "sort",
        label: sortLabels[filters.sortBy] || filters.sortBy,
        clear: () => setFilters((f) => ({ ...f, sortBy: "name" })),
      });
    }

    return chips;
  }, [filters.search, filters.category, filters.sortBy]);

  const hasActiveFilters = activeFilters.length > 0;
  const hasNoResults = filteredProducts.length === 0;

  /* ==========================================
     FORCE ANIMATION REPLAY ON FILTER CHANGE
     — the `key` changes → grid remounts → cards animate in again
  ========================================== */

  const gridKey = `${filters.search}|${filters.category}|${filters.sortBy}`;

  /* ==========================================
     RESET
  ========================================== */

  const clearAll = () => setFilters(DEFAULT_FILTERS);

  return (
    <>
      <Header />

      <main className="bg-[#F9FAFB]">
        {/* ==========================================
            FILTERS
        ========================================== */}

        <ProductFilters
          filters={filters}
          onFiltersChange={setFilters}
          productCount={filteredProducts.length}
        />

        {/* ==========================================
            RESULTS
        ========================================== */}

        <section
          ref={gridRef}
          className="px-5 pb-16 pt-8 sm:px-8 sm:pt-10 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            {/* ---------- TOOLBAR ---------- */}

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              {/* Left — active filters */}
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {hasActiveFilters && !hasNoResults && (
                  <>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
                      Filtered by
                    </span>

                    {activeFilters.map((chip) => (
                      <button
                        key={chip.key}
                        type="button"
                        onClick={chip.clear}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3 py-1 text-xs font-medium capitalize text-[#2563eb] transition-all duration-200 hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                      >
                        {chip.label}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          className="h-3 w-3 transition-transform duration-200 group-hover:rotate-90"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6l12 12M18 6L6 18"
                          />
                        </svg>
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-xs font-medium text-[#6B7280] underline-offset-4 transition-colors hover:text-[#2563eb] hover:underline"
                    >
                      Clear all
                    </button>
                  </>
                )}
              </div>

              {/* Right — view toggle */}
              <div className="flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                  className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#3b82f6] text-white"
                      : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                  className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-[#3b82f6] text-white"
                      : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* ---------- RESULTS ---------- */}

            {!hasNoResults ? (
              <ProductGrid
                key={gridKey}
                products={filteredProducts}
                viewMode={viewMode}
                groupByCategory={filters.sortBy === "category"}
              />
            ) : (
              <div className="mx-auto max-w-md rounded-2xl border border-[#E5E7EB] bg-white px-6 py-14 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#3b82f6]/15 bg-[#3b82f6]/[0.06] text-[#2563eb]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20 20-3.5-3.5"
                    />
                  </svg>
                </div>

                <h2 className="mt-5 text-lg font-bold tracking-[-0.01em] text-[#111827]">
                  No equipment found
                </h2>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#6B7280]">
                  {filters.search.trim()
                    ? `We couldn't find anything matching "${filters.search.trim()}".`
                    : filters.category !== "all"
                    ? `No items in "${filters.category}" match your filters.`
                    : "No items match the selected filters."}
                </p>

                {/* Show active chips inline for easy clearing */}
                {hasActiveFilters && (
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                    {activeFilters.map((chip) => (
                      <button
                        key={chip.key}
                        type="button"
                        onClick={chip.clear}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3 py-1 text-xs font-medium capitalize text-[#2563eb] transition-all duration-200 hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/10"
                      >
                        {chip.label}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          className="h-3 w-3"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6l12 12M18 6L6 18"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1d4ed8] hover:shadow-[0_10px_25px_-8px_rgba(37,99,235,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}