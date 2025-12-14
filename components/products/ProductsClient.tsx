"use client";

import React from "react";
import PricingDropdown from "@/components/products/PricingDropdown";
import SortedSelect from "@/components/products/SortedSelect/SortedSelect";
import PaginationSection from "@/components/products/PaginationSection";
import { useProductsLogic } from "./useProductsLogic";
import ProductsSection from "@/components/products/ProductsSection";
import CategoryDropdown from "./CategoryDropdown";
import BrandDropdown from "./BrandDropdown";

export default function ProductsClient({
  optionsBrand,
  optionsCategory,
}: {
  optionsBrand: string[];
  optionsCategory: string[];
}) {
  const {
    initialCategories,
    initialBrands,
    loading,
    error,
    products,
    totalPages,
    setPage,
    setCategories,
    setBrands,
    handleSortedChange,
    handlePriceChange,
  } = useProductsLogic();

  return (
    <div className="flex min-h-full w-full border-t border-[var(--color-border-secondary)] mt-10">
      <div className="flex flex-col gap-y-10 w-full max-w-[360px] p-10 px-10">
        <CategoryDropdown limit={5} onChange={setCategories} initial={initialCategories} options={optionsCategory} />
        <BrandDropdown limit={5} onChange={setBrands} initial={initialBrands} options={optionsBrand} />
        <PricingDropdown onChange={handlePriceChange} />
      </div>

      <div className="flex flex-col w-full gap-y-10 p-10 border-l border-[var(--color-border-secondary)]">
        <SortedSelect onChange={handleSortedChange} />
        <ProductsSection loading={loading} error={error} products={products} />
        {totalPages > 1 && <PaginationSection onChange={setPage} totalPages={totalPages} />}
      </div>
    </div>
  );
}
