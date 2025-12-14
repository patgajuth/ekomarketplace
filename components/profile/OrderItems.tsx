"use client";

import React from "react";

export interface OrderItemDetail {
  id: number;
  quantity: number;
  protection: boolean;
  note?: string;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function OrderItems({ items }: { items: OrderItemDetail[] }) {
  return (
    <div className="pl-10">
      <ul className="space-y-2">
        {items.map(({ id, product, quantity, note, protection }) => (
          <li key={id} className="list-disc list-inside pl-2">
            <span className="textM font-medium">
              <span>{product.name}</span>
              <span className="ml-2">x{quantity}</span>
            </span>
            <div className="ml-6">
              <div>${product.price.toFixed(2)}</div>
              {note && <div className="textXS italic text-[var(--textColor-tertiary)]">Note: {note}</div>}
              {protection && <div className="textXS text-success-500">Protection added</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
