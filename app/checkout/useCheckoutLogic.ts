"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFetchWithRetry } from "@/hooks/useFetchWithRetry";

type LocalCheckoutItem = { id: string; quantity: number; note?: string };

type ProductFromAPI = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: { name: string };
};

export type CheckoutItem = ProductFromAPI & { quantity: number; note?: string };

const SHIPPING_PRICE = 5;
const SHIPPING_INSURANCE = 6;
const SERVICE_FEE = 0.5;

export function useCheckoutLogic() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  const fetchWithRetry = useFetchWithRetry();
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [protections, setProtections] = useState<Record<number, boolean>>({});
  const [address, setAddress] = useState<string>("");
  const [makeMain, setMakeMain] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadItems() {
      try {
        setLoading(true);
        const raw = localStorage.getItem("checkoutCart") || "[]";
        const localItems: LocalCheckoutItem[] = JSON.parse(raw);
        if (!localItems.length) throw new Error("No products in the shopping cart");

        const ids = localItems.map((li) => parseInt(li.id, 10)).filter((n) => !isNaN(n));
        const urlCart = `${process.env.NEXTAUTH_URL || ""}/api/cart`;
        const res = await fetchWithRetry(urlCart, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ids),
        });
        const prods: ProductFromAPI[] = await res.json();

        const combined: CheckoutItem[] = prods.map((p) => {
          const local = localItems.find((li) => parseInt(li.id, 10) === p.id)!;
          return { ...p, quantity: local.quantity, note: local.note };
        });
        setItems(combined);
        const initProt: Record<number, boolean> = {};
        combined.forEach((p) => {
          initProt[p.id] = false;
        });
        setProtections(initProt);
      } catch (err) {
        console.error("Error loading checkout items:", err);
        setError("Cart loading error");
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, [router, fetchWithRetry]);

  const toggleProtection = useCallback((id: number) => {
    setProtections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const totalProductPrice = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  const totalProtection = useMemo(() => Object.values(protections).filter(Boolean).length, [protections]);

  const grandTotal = useMemo(
    () => totalProductPrice + totalProtection + SHIPPING_PRICE + SHIPPING_INSURANCE + SERVICE_FEE,
    [totalProductPrice, totalProtection]
  );

  const handlePay = useCallback(async () => {
    try {
      setLoading(true);
      if (makeMain && address.trim()) {
        const urlAddr = `${process.env.NEXTAUTH_URL || ""}/api/user/address`;
        await fetchWithRetry(urlAddr, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...parseAddress(address), makeMain }),
        });
      }
      const userId = session?.user?.id;
      const urlSuccess = `${process.env.NEXTAUTH_URL || ""}/api/success`;
      await fetchWithRetry(urlSuccess, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Number(userId),
          address,
          totalAmount: grandTotal,
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            note: i.note,
            protection: protections[i.id],
          })),
        }),
      });
      router.push("/checkout/success");
    } catch (err) {
      console.error("Payment error:", err);
      setError("Payment failed");
    } finally {
      setLoading(false);
    }
  }, [address, makeMain, items, protections, grandTotal, router, session, fetchWithRetry]);

  return {
    status,
    items,
    protections,
    address,
    setAddress,
    makeMain,
    setMakeMain,
    toggleProtection,
    totalProductPrice,
    totalProtection,
    grandTotal,
    handlePay,
    loading,
    error,
  } as const;
}

function parseAddress(full: string) {
  const parts = full.split(",").map((s) => s.trim());
  return {
    country: parts[0] || "",
    province: parts[1] || "",
    city: parts[2] || "",
    postalCode: parts[3] || "",
  };
}
