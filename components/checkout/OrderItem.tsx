import React from "react";
import Checkbox from "@/components/ui/Checkbox";
import ProductInfo from "@/components/cart/ProductInfo";

type OrderItemProps = {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  quantity: number;
  note?: string;
  protection: boolean;
  onToggleProtection: (id: number) => void;
};

export default function OrderItem({
  id,
  name,
  imageUrl,
  category,
  price,
  quantity,
  note,
  protection,
  onToggleProtection,
}: OrderItemProps) {
  return (
    <div className="flex flex-col gap-y-4 p-6 rounded-md bg-[var(--color-tile)] border border-[var(--color-border-secondary)] ">
      <div className="flex items-end justify-between">
        <ProductInfo category={category} imageUrl={imageUrl} name={name} price={price} />
        <span className="textL pr-2">x{quantity}</span>
      </div>

      {note && (
        <>
          <hr className="text-[var(--color-border-secondary)]" />
          <div className="p-3 bg-[var(--color-tile)] border border-[var(--color-border-secondary)] rounded-md text-[var(--textColor-secondary)]">
            <span className="font-medium">Note:</span>
            <p className="mt-1 whitespace-pre-wrap">{note}</p>
          </div>
        </>
      )}

      <hr className="text-[var(--color-border-secondary)]" />
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <Checkbox checked={protection} onChange={() => onToggleProtection(id)} text="Product Protection" />
          <span className="font-medium pr-2">$1</span>
        </div>
        <span className="textS text-[var(--textColor-tertiary)] pl-10">
          The claim process is easy and instant, valid for 6 months
        </span>
      </div>
    </div>
  );
}
