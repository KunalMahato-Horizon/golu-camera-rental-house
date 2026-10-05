"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { equipment } from "@/data/equipment";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";

export default function ProductGrid({
  products = equipment,
  viewMode = "grid",
  groupByCategory = false,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const triggerRef = useRef(null);

  /* ==========================================
     OPEN / CLOSE HANDLERS
  ========================================== */

  const openModal = useCallback((product, triggerEl) => {
    triggerRef.current = triggerEl;
    setSelectedProduct(product);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
    if (triggerRef.current) {
      triggerRef.current.focus?.();
      triggerRef.current = null;
    }
  }, []);

  /* ==========================================
     BODY SCROLL LOCK + ESCAPE HANDLER
  ========================================== */

  useEffect(() => {
    if (!selectedProduct) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProduct, closeModal]);

  /* ==========================================
     OPTIONAL: GROUP PRODUCTS BY CATEGORY
     (used when sortBy === "category")
  ========================================== */

  const groupedProducts = groupByCategory
    ? products.reduce((acc, product) => {
        if (!acc[product.category]) acc[product.category] = [];
        acc[product.category].push(product);
        return acc;
      }, {})
    : null;

  /* ==========================================
     EMPTY STATE
  ========================================== */

  if (!products.length) {
    return null;
  }

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <>
      {/* ==========================================
          OPTIONAL CATEGORY GROUPING
      ========================================== */}

      {groupByCategory && groupedProducts ? (
        <div className="space-y-12">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category}>
              {/* Group header */}
              <div className="mb-5 flex items-center gap-3">
                <h2 className="text-lg font-bold tracking-[-0.01em] text-[#111827] sm:text-xl">
                  {category}
                </h2>
                <span className="text-xs font-medium text-[#9CA3AF]">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>

              {/* Grid for this group */}
              <ProductGridItems
                items={items}
                viewMode={viewMode}
                onOpen={openModal}
              />
            </div>
          ))}
        </div>
      ) : (
        <ProductGridItems
          items={products}
          viewMode={viewMode}
          onOpen={openModal}
        />
      )}

      {/* ==========================================
          PRODUCT DETAIL MODAL
      ========================================== */}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </>
  );
}

/* =====================================================
   INNER COMPONENT — renders the actual grid or list
   Kept separate so the category-grouped version can
   reuse the exact same rendering
====================================================== */

function ProductGridItems({ items, viewMode, onOpen }) {
  const isList = viewMode === "list";

  return (
    <div
      className={
        isList
          ? "flex flex-col gap-3"
          : "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      }
    >
      {items.map((product, index) => (
        <div
          key={product.id}
          className="animate-card-in"
          style={{
            animationDelay: `${Math.min(index, 10) * 35}ms`,
          }}
        >
          <ProductCard
            product={product}
            view={viewMode}
            onDetails={(e) => onOpen(product, e?.currentTarget)}
          />
        </div>
      ))}
    </div>
  );
}