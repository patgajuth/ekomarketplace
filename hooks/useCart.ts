import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAlert } from "@/hooks/useAlert";

export type CartItem = {
  id: string;
  name?: string;
  quantity: number;
  note: string;
  cardAdd?: boolean;
  addition?: boolean;
  stock?: number;
};

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const notification = useAlert();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  useEffect(() => {
    const raw = localStorage.getItem("cart") || "[]";
    try {
      setCart(JSON.parse(raw));
    } catch {
      setCart([]);
    }
  }, []);

  const sync = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }, []);

  const addToCart = useCallback(
    (id: string, name: string, quantity = 1, stock: number) => {
      const raw = localStorage.getItem("cart") || "[]";
      let current: CartItem[];
      try {
        current = JSON.parse(raw);
      } catch {
        current = [];
      }
      const idx = current.findIndex((item) => item.id === id);
      const cartQuantity = current[idx]?.quantity || 0;

      if (!isLoggedIn) {
        notification({ type: "warning", message: "Log in to add items to your cart" });
        return;
      } else if (stock - cartQuantity <= 0) {
        notification({ type: "warning", message: `No items available` });
        return;
      }
      notification({ type: "success", message: `${name} added to basket in quantity ${quantity}` });

      if (idx > -1) {
        if (current[idx].quantity + quantity <= stock) {
          current[idx].quantity += quantity;
        }
      } else {
        current.push({ id, quantity, note: "" });
      }

      sync([...current]);
    },
    [sync, isLoggedIn, notification]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      const raw = localStorage.getItem("cart") || "[]";
      let current: CartItem[];
      try {
        current = JSON.parse(raw);
      } catch {
        current = [];
      }

      const updated = current.map((item) => (item.id === id ? { ...item, quantity } : item));
      sync(updated);
    },
    [sync]
  );

  const updateNote = useCallback(
    (id: string, note: string) => {
      const raw = localStorage.getItem("cart") || "[]";
      let current: CartItem[];
      try {
        current = JSON.parse(raw);
      } catch {
        current = [];
      }

      const updated = current.map((item) => (item.id === id ? { ...item, note } : item));
      sync(updated);
    },
    [sync]
  );

  const removeItem = useCallback(
    (id: string) => {
      const raw = localStorage.getItem("cart") || "[]";
      let current: CartItem[];
      try {
        current = JSON.parse(raw);
      } catch {
        current = [];
      }

      const updated = current.filter((item) => item.id !== id);
      sync(updated);
    },
    [sync]
  );

  return {
    cart,
    addToCart,
    updateQuantity,
    updateNote,
    removeItem,
  };
}
