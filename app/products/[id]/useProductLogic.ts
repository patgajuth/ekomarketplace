"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { useCart } from "@/hooks/useCart";
import { Product } from "@prisma/client";
import { useFetchWithRetry } from "@/hooks/useFetchWithRetry";

export type ProductWithCategory = Product & { category: { name: string } };

export function useProductLogic() {
  const params = useParams();
  const notification = useAlert();
  const { addToCart } = useCart();
  const fetchWithRetry = useFetchWithRetry();

  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("white");

  useEffect(() => {
    if (!params.id) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function fetchProduct() {
      try {
        const baseUrl = process.env.NEXTAUTH_URL || "";
        const res = await fetchWithRetry(`${baseUrl}/api/products/${params.id}`);
        const data: ProductWithCategory = await res.json();
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Błąd przy pobieraniu produktu:", err);
          setError("Nie udało się pobrać produktu");
          notification({ type: "danger", message: "Błąd przy ładowaniu produktu" });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [params.id, notification, fetchWithRetry]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product.id.toString(), product.name, quantity, product.stock);
  }, [product, quantity, addToCart]);

  const shippingEstimate = useMemo(() => {
    const today = new Date();
    const start = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    const endDate = new Date(today);
    const randomDays = Math.floor(Math.random() * 7) + 1;
    endDate.setDate(today.getDate() + randomDays);
    const end = endDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
    return `${start} - ${end}`;
  }, []);

  const images = useMemo(
    () => [product?.imageUrl || "", "https://i.ibb.co/HpGX2w4R/noImage.png", "https://i.ibb.co/HpGX2w4R/noImage.png"],
    [product]
  );

  const colors = useMemo(
    () => [
      { name: "white", className: "bg-white" },
      { name: "black", className: "bg-black" },
    ],
    []
  );

  return {
    product,
    loading,
    error,
    quantity,
    setQuantity,
    selectedColor,
    setSelectedColor,
    handleAddToCart,
    shippingEstimate,
    images,
    colors,
  } as const;
}
