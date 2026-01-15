import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";

type LocalCartItem = { id: string; quantity: number; note: string; price: number };

export type CartProduct = Omit<Product, "id"> & {
  id: string;
  quantity: number;
  note: string;
  category: { name: string };
};

export function useCartLogic() {
  const router = useRouter();
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    const raw = localStorage.getItem("cart") || "[]";
    let localCart: LocalCartItem[] = [];
    try {
      localCart = JSON.parse(raw);
    } catch {}
    if (localCart.length === 0) {
      setProducts([]);
      setSelectedItems(new Set());
      setSelectAll(false);
      return;
    }
    (async () => {
      const ids = localCart.map((c) => Number(c.id));
      const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ids),
      });
      const data = await res.json();
      const combined = data.map((p: Product) => {
        const local = localCart.find((c) => c.id === String(p.id))!;
        return { ...p, id: String(p.id), quantity: local.quantity, note: local.note };
      });
      setProducts(combined);
      setSelectedItems(new Set(combined.map((p: Product) => p.id)));
      setSelectAll(true);
    })();
  }, []);

  const subtotal = useMemo(
    () => products.reduce((sum, p) => (selectedItems.has(p.id) ? sum + p.price * p.quantity : sum), 0),
    [products, selectedItems]
  );
  const selectedCount = useMemo(
    () => products.filter((p) => selectedItems.has(p.id)).length,
    [products, selectedItems]
  );

  const updateQuantity = useCallback((id: string, qty: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));
    const raw = localStorage.getItem("cart") || "[]";
    let localCart: LocalCartItem[] = [];
    try {
      localCart = JSON.parse(raw);
    } catch {}
    const updated = localCart.map((item) => (item.id === id ? { ...item, quantity: qty } : item));
    localStorage.setItem("cart", JSON.stringify(updated));
  }, []);

  const updateNote = useCallback((id: string, note: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, note } : p)));
    const raw = localStorage.getItem("cart") || "[]";
    let localCart: LocalCartItem[] = [];
    try {
      localCart = JSON.parse(raw);
    } catch {}
    const updated = localCart.map((item) => (item.id === id ? { ...item, note } : item));
    localStorage.setItem("cart", JSON.stringify(updated));
  }, []);

  const removeItem = useCallback(
    (id: string) => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        setSelectAll(next.size === products.length - 1);
        return next;
      });
      const raw = localStorage.getItem("cart") || "[]";
      let localCart: LocalCartItem[] = [];
      try {
        localCart = JSON.parse(raw);
      } catch {}
      const updated = localCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
    },
    [products.length]
  );

  const toggleSelectItem = useCallback(
    (id: string) => {
      setSelectedItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        setSelectAll(next.size === products.length);
        return next;
      });
    },
    [products.length]
  );
  const toggleSelectAll = useCallback(() => {
    if (selectAll) setSelectedItems(new Set());
    else setSelectedItems(new Set(products.map((p) => p.id)));
    setSelectAll((prev) => !prev);
  }, [products, selectAll]);

  const handleCheckout = useCallback(() => {
    if (products.length === 0 || selectedCount === 0) return;
    const toCheckout = products
      .filter((p) => selectedItems.has(p.id))
      .map(({ id, quantity, note }) => ({ id, quantity, note }));
    localStorage.setItem("checkoutCart", JSON.stringify(toCheckout));
    router.push("/checkout");
  }, [products, selectedItems, selectedCount, router]);

  const canCheckout = products.length > 0 && selectedCount > 0;

  return {
    products,
    selectAll,
    selectedItems,
    subtotal,
    selectedCount,
    canCheckout,
    updateQuantity,
    updateNote,
    removeItem,
    toggleSelectItem,
    toggleSelectAll,
    handleCheckout,
  } as const;
}
