"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { equipment } from "@/data/equipment";

const DEFAULT_FILTERS = {
  search: "",
  category: "all",
  sortBy: "name",
};

const SORT_OPTIONS = [
  { value: "name", label: "Name: A–Z" },
  { value: "name-desc", label: "Name: Z–A" },
  { value: "category", label: "By category" },
];

const SEARCH_DEBOUNCE_MS = 250;

/* ==========================================
   BUILD CATEGORY LIST FROM DATA
   — always accurate, shows live counts
========================================== */

const CATEGORY_ORDER = [
  "Cameras",
  "Lenses",
  "Gimbals",
  "Drones",
  "Lighting",
];

const CATEGORIES = CATEGORY_ORDER.map((name) => ({
  name,
  count: equipment.filter((item) => item.category === name).length,
}));

export default function ProductFilters({
  filters = DEFAULT_FILTERS,
  onFiltersChange,
  productCount = 0,
}) {
  /* ==========================================
     LOCAL SEARCH DRAFT (for debouncing)
  ========================================== */

  const [searchDraft, setSearchDraft] = useState(filters.search);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);
  const searchInputRef = useRef(null);

  // Keep draft in sync if parent resets filters externally
  useEffect(() => {
    setSearchDraft(filters.search);
  }, [filters.search]);

  /* ==========================================
     ⌘K / Ctrl+K FOCUS SHORTCUT
  ========================================== */

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ==========================================
     DEBOUNCED SEARCH → PARENT
  ========================================== */

  const handleSearchChange = (value) => {
    setSearchDraft(value);
    setIsSearching(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onFiltersChange?.({ ...filters, search: value });
      setIsSearching(false);
    }, SEARCH_DEBOUNCE_MS);
  };

  const clearSearch = () => {
    setSearchDraft("");
    setIsSearching(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onFiltersChange?.({ ...filters, search: "" });
    searchInputRef.current?.focus();
  };

  /* ==========================================
     CATEGORY / SORT / RESET
  ========================================== */

  const handleCategoryChange = (value) => {
    onFiltersChange?.({ ...filters, category: value });
  };

  const handleSortChange = (value) => {
    onFiltersChange?.({ ...filters, sortBy: value });
  };

  const resetFilters = () => {
    setSearchDraft("");
    setIsSearching(false);
    onFiltersChange?.({ search: "", category: "all", sortBy: "name" });
  };

  /* ==========================================
     DERIVED STATE
  ========================================== */

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category !== "all") count++;
    if (filters.sortBy !== "name") count++;
    return count;
  }, [filters]);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <section className="relative border-b border-[#E5E7EB] bg-[#F9FAFB] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
      {/* Soft background wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(50% 60% at 10% 0%, rgba(59,130,246,0.05), transparent 60%), radial-gradient(50% 60% at 90% 100%, rgba(94,231,242,0.05), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
              Full Catalog
            </div>

            <h1 className="text-3xl font-bold tracking-[-0.03em] text-[#111827] sm:text-4xl lg:text-5xl">
              Equipment Catalog
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
              Browse our full collection of professional camera and production
              equipment.
            </p>
          </div>

          {/* Live count badge */}
          <div className="shrink-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-xs font-medium text-[#374151] shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              </span>
              <span className="font-semibold text-[#111827]">
                {productCount}
              </span>
              {productCount === 1 ? "item" : "items"}
              {hasActiveFilters ? " shown" : " available"}
            </span>
          </div>
        </div>

        {/* ==========================================
            FILTER PANEL
        ========================================== */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:p-5">
          {/* ==========================================
              TOP ROW — SEARCH + SORT
          ========================================== */}

          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-[1.8fr_1fr]">
            {/* SEARCH */}
            <div>
              <label
                htmlFor="equipment-search"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]"
              >
                Search
              </label>

              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="m20 20-4-4" />
                </svg>

                <input
                  ref={searchInputRef}
                  id="equipment-search"
                  type="text"
                  value={searchDraft}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search by name, brand, or feature..."
                  className="h-11 w-full rounded-lg border border-[#E5E7EB] bg-white pl-10 pr-24 text-sm text-[#111827] outline-none transition-all placeholder:text-[#9CA3AF] hover:border-[#D1D5DB] focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/10"
                />

                {/* Right-side controls: searching spinner OR clear + shortcut */}
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                  {isSearching && (
                    <span
                      className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#3b82f6]/25 border-t-[#3b82f6]"
                      aria-hidden="true"
                    />
                  )}

                  {searchDraft && !isSearching && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-[#F3F4F6] hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
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
                          d="M6 6l12 12M18 6L6 18"
                        />
                      </svg>
                    </button>
                  )}

                  {!searchDraft && !isSearching && (
                    <kbd className="hidden items-center gap-0.5 rounded border border-[#E5E7EB] bg-[#F9FAFB] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[#9CA3AF] sm:inline-flex">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  )}
                </div>
              </div>
            </div>

            {/* SORT */}
            <div>
              <label
                htmlFor="equipment-sort"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]"
              >
                Sort By
              </label>

              <div className="relative">
                <select
                  id="equipment-sort"
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#E5E7EB] bg-white pl-3.5 pr-10 text-sm text-[#111827] outline-none transition-all hover:border-[#D1D5DB] focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/10"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* ==========================================
              CATEGORY PILLS
          ========================================== */}

          <div className="mt-4 border-t border-[#F3F4F6] pt-4">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
                Category
              </span>
            </div>

            {/* Horizontal scroll on mobile, wraps on larger */}
            <div className="-mx-1 flex snap-x snap-mandatory overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
              {/* All */}
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                aria-pressed={filters.category === "all"}
                className={`group mr-2 flex shrink-0 snap-start items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 ${
                  filters.category === "all"
                    ? "border-[#3b82f6] bg-[#3b82f6] text-white shadow-[0_8px_20px_-6px_rgba(59,130,246,0.5)]"
                    : "border-[#E5E7EB] bg-white text-[#374151] hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/[0.06] hover:text-[#2563eb]"
                }`}
              >
                <span>All</span>
                <span
                  className={`text-[10px] font-semibold ${
                    filters.category === "all"
                      ? "text-white/70"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  {equipment.length}
                </span>
              </button>

              {CATEGORIES.map((category) => {
                const isActive = filters.category === category.name;
                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => handleCategoryChange(category.name)}
                    aria-pressed={isActive}
                    className={`group mr-2 flex shrink-0 snap-start items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 ${
                      isActive
                        ? "border-[#3b82f6] bg-[#3b82f6] text-white shadow-[0_8px_20px_-6px_rgba(59,130,246,0.5)]"
                        : "border-[#E5E7EB] bg-white text-[#374151] hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/[0.06] hover:text-[#2563eb]"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`text-[10px] font-semibold ${
                        isActive ? "text-white/70" : "text-[#9CA3AF]"
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==========================================
              RESET (only when filters are active)
          ========================================== */}

          {hasActiveFilters && (
            <div className="mt-4 flex items-center justify-between border-t border-[#F3F4F6] pt-4">
              <p className="text-xs text-[#9CA3AF]">
                {activeFilterCount}{" "}
                {activeFilterCount === 1 ? "filter" : "filters"} applied
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="group inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] transition-all duration-200 hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/[0.06] hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-3 w-3 transition-transform duration-300 group-hover:-rotate-180"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-3-6.7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 4v5h-5"
                  />
                </svg>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}