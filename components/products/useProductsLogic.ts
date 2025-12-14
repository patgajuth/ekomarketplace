"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchWithRetry } from "@/hooks/useFetchWithRetry";
import { Product } from "@prisma/client";

export type ProductWithCategory = Product & { category: { name: string } };

export function useProductsLogic() {
  const searchParams = useSearchParams();
  const initialCategories = searchParams.getAll("category");
  const initialBrands = searchParams.getAll("brand");

  const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1", 10));
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [brands, setBrands] = useState<string[]>(initialBrands);
  const [sorted, setSorted] = useState<{ sortBy: string; itemsPerPage: string }>({
    sortBy: "Latest",
    itemsPerPage: "9",
  });
  const [price, setPrice] = useState<{ minPrice: string; maxPrice: string }>({ minPrice: "", maxPrice: "" });

  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchWithRetry = useFetchWithRetry();

  const queryParams = useMemo<string>(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", sorted.itemsPerPage);
    params.set("sorted", sorted.sortBy);

    const cats = categories.filter((c) => c !== "All")
    if (cats.length > 0) {
      params.set("category", cats.join("_"));
    }

    const brs = brands.filter((b) => b !== "All");
    if (brs.length > 0) {
      params.set("brand", brs.join("_"));
    }

    if (price.minPrice) params.set("minPrice", price.minPrice);
    if (price.maxPrice) params.set("maxPrice", price.maxPrice);

    const str = params.toString();
    return str.length ? `?${str}` : "";
  }, [page, sorted, categories, brands, price]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(false);
      try {
        const baseUrl = process.env.NEXTAUTH_URL || "";
        const url = `${baseUrl}/api/products${queryParams}`;
        const res = await fetchWithRetry(url);
        const data = await res.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [queryParams, fetchWithRetry]);

  const handleSortedChange = (data: { sortBy: string; itemsPerPage: string }) => {
    if (data.sortBy !== sorted.sortBy || data.itemsPerPage !== sorted.itemsPerPage) {
      setSorted(data);
      setPage(1);
    }
  };

  const handlePriceChange = (data: { minPrice: string; maxPrice: string }) => {
    if (data.minPrice !== price.minPrice || data.maxPrice !== price.maxPrice) {
      setPrice(data);
      setPage(1);
    }
  };

  return {
    initialCategories,
    initialBrands,
    categories,
    brands,
    page,
    setPage,
    setCategories,
    setBrands,
    sorted,
    price,
    loading,
    error,
    products,
    totalPages,
    handleSortedChange,
    handlePriceChange,
  } as const;
}
