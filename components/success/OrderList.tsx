import React from "react";
import ProductInfo from "@/components/cart/ProductInfo";

type OrderItem = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  quantity: number;
};

type OrderListProps = {
  items: OrderItem[];
};

export default function OrderList({ items }: OrderListProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <span className="textL font-medium">Your Order</span>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-end border border-[var(--color-border-secondary)] rounded-md p-4"
        >
          <ProductInfo
            category={item.category}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
          />
          <span className="textM font-medium">x{item.quantity}</span>
        </div>
      ))}
    </div>
  );
}