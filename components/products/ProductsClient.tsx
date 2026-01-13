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
  const initialCategorySelection = initialCategories.length ? initialCategories : ["Wszystkie"];
  const initialBrandSelection = initialBrands.length ? initialBrands : ["Wszystkie"];

  return (
    <div className="eco-surface flex flex-col lg:flex-row min-h-full w-full mt-10 rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-y-8 w-full lg:max-w-[300px] p-6 sm:p-8 lg:p-10 bg-[var(--color-surface)]">
        <CategoryDropdown
          limit={5}
          onChange={setCategories}
          initial={initialCategorySelection}
          options={optionsCategory}
        />
        <BrandDropdown limit={5} onChange={setBrands} initial={initialBrandSelection} options={optionsBrand} />
        <PricingDropdown onChange={handlePriceChange} />
      </div>

      <div className="flex flex-col w-full gap-y-8 p-6 sm:p-8 lg:p-10 bg-[var(--color-panel)] border-t lg:border-t-0 lg:border-l border-[var(--color-border-secondary)]">
        <SortedSelect onChange={handleSortedChange} />
        <ProductsSection loading={loading} error={error} products={products} />
        {totalPages > 1 && <PaginationSection onChange={setPage} totalPages={totalPages} />}
      </div>
    </div>
  );
}
