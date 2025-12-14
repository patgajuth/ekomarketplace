"use client";

import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import ProductCard from "../products/ProductCard";
import TileContainer from "./TileContainer";
import Loading from "../ui/Loading";
import { useFetchWithRetry } from "@/hooks/useFetchWithRetry";

type ProductWithCategory = Product & {
  category: { name: string };
};

export default function RecommendationSection() {
  const fetchWithRetry = useFetchWithRetry();
  const [products, setProducts] = useState<ProductWithCategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      const baseUrl = process.env.NEXTAUTH_URL || "";
      const url = `${baseUrl}/api/products/recommendation`;

      try {
        const res = await fetchWithRetry(url);
        const data: ProductWithCategory[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Błąd podczas pobierania rekomendacji:", err);
        setError("Nie udało się pobrać rekomendowanych produktów");
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [fetchWithRetry]);

  if (loading) {
    return (
      <TileContainer title="Eco picks">
        <Loading text="Ładowanie eko polecanych…" />
      </TileContainer>
    );
  }

  if (error) {
    return (
      <TileContainer title="Eco picks">
        <div className="p-8 text-center text-red-500">{error}</div>
      </TileContainer>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <TileContainer title="Eco picks">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageURL={product.imageUrl}
          category={product.category.name}
          itemName={product.name}
          stock={product.stock}
          price={product.price}
          discount={product.discount}
        />
      ))}
    </TileContainer>
  );
}
