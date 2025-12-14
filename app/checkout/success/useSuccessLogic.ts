"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useFetchWithRetry } from "@/hooks/useFetchWithRetry";

type LocalCheckoutItem = {
  id: string;
  quantity: number;
  note?: string;
  protection?: boolean;
  address?: string;
  makeMain?: boolean;
};

type ProductFromAPI = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: { name: string };
};

type SuccessOrderItem = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  quantity: number;
};

type Totals = {
  totalItems: number;
  totalProductPrice: number;
  totalProtection: number;
  shippingPrice: number;
  shippingInsurance: number;
  serviceFee: number;
  grandTotal: number;
};

export function useSuccessLogic() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (!session?.user) {
    router.push("/");
  }
  const userId = session?.user?.id;
  const fetchWithRetry = useFetchWithRetry();

  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [transactionDate, setTransactionDate] = useState<string>("");
  const [paymentMethod] = useState<string>("Apple Pay");
  const [shippingMethod] = useState<string>("NexusHub Courier");
  const [items, setItems] = useState<SuccessOrderItem[]>([]);
  const [totals, setTotals] = useState<Totals | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function finalize() {
      try {
        setLoading(true);
        const raw = localStorage.getItem("checkoutCart");
        if (!raw) throw new Error("No checkoutCart in localStorage");

        const localItems: LocalCheckoutItem[] = JSON.parse(raw);
        if (!Array.isArray(localItems) || localItems.length === 0) throw new Error("Empty cart");

        const anyWithAddress = localItems.find((li) => li.address && li.makeMain);
        if (anyWithAddress) {
          const urlAddr = `${process.env.NEXTAUTH_URL || ""}/api/user/address`;
          await fetchWithRetry(urlAddr, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...parseAddress(anyWithAddress.address!), makeMain: true }),
          });
        }

        const ids = localItems.map((li) => parseInt(li.id, 10)).filter((n) => !isNaN(n));
        const urlCart = `${process.env.NEXTAUTH_URL || ""}/api/cart`;
        const prodRes = await fetchWithRetry(urlCart, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ids),
        });
        const prods: ProductFromAPI[] = await prodRes.json();

        const orderItems: SuccessOrderItem[] = prods.map((p) => {
          const local = localItems.find((li) => parseInt(li.id, 10) === p.id)!;
          return {
            id: String(p.id),
            name: p.name,
            imageUrl: p.imageUrl,
            category: p.category.name,
            price: p.price,
            quantity: local.quantity,
          };
        });
        setItems(orderItems);

        const totalItems = orderItems.reduce((sum, it) => sum + it.quantity, 0);
        const totalProductPrice = orderItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
        const totalProtection = localItems.filter((li) => li.protection).length;
        const shippingPrice = 5;
        const shippingInsurance = 6;
        const serviceFee = 0.5;
        const grandTotal = totalProductPrice + totalProtection + shippingPrice + shippingInsurance + serviceFee;
        setTotals({
          totalItems,
          totalProductPrice,
          totalProtection,
          shippingPrice,
          shippingInsurance,
          serviceFee,
          grandTotal,
        });

        const urlSuccess = `${process.env.NEXTAUTH_URL || ""}/api/success`;
        const orderRes = await fetchWithRetry(urlSuccess, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: Number(userId),
            address: anyWithAddress?.address ?? "",
            totalAmount: grandTotal,
            items: localItems.map((li) => ({
              productId: parseInt(li.id, 10),
              quantity: li.quantity,
              note: li.note,
              protection: !!li.protection,
            })),
          }),
        });
        const orderData = await orderRes.json();
        setInvoiceNumber(String(orderData.id));
        setTransactionDate(new Date().toLocaleString());

        localStorage.removeItem("checkoutCart");
        const mainRaw = localStorage.getItem("cart") || "[]";
        const mainCart: LocalCheckoutItem[] = JSON.parse(mainRaw);
        const updatedMain = mainCart.filter((mc) => !localItems.some((li) => li.id === mc.id));
        localStorage.setItem("cart", JSON.stringify(updatedMain));
      } catch (err) {
        console.error("Finalization error:", err);
        setError("Order finalization failed");
      } finally {
        setLoading(false);
      }
    }
    finalize();
  }, [router, userId, alert]);

  return {
    status,
    invoiceNumber,
    transactionDate,
    paymentMethod,
    shippingMethod,
    items,
    totals,
    loading,
    error,
  } as const;
}

function parseAddress(full: string) {
  const [country = "", province = "", city = "", postalCode = ""] = full.split(",").map((s) => s.trim());
  return { country, province, city, postalCode };
}
