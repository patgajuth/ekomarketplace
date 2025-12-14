"use client";

import { useState } from "react";
import clsx from "clsx";
import Counter from "../ui/Counter";
import ProductInfo from "./ProductInfo";

type CartProductItemProps = {
  category: string;
  imageUrl: string;
  name: string;
  price: number;
  max: number;
  value: number;
  note?: string;
  onChange: (value: number) => void;
  onNoteChange?: (text: string) => void;
};

export default function CartProductItem({
  category,
  imageUrl,
  name,
  price,
  max,
  value,
  note = "",
  onChange,
  onNoteChange,
}: CartProductItemProps) {
  const [writeNote, setWriteNote] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 p-6 w-full bg-[var(--color-tile)] border border-[var(--color-border-secondary)] rounded-md">
      <div className="flex justify-between items-end">
        <ProductInfo category={category} imageUrl={imageUrl} name={name} price={price} />
        <div className="flex items-center gap-x-6">
          <button
            onClick={() => setWriteNote((prev) => !prev)}
            className="text-[var(--color-primary)] h-max textM cursor-pointer pr-6 border-r border-r-[var(--color-border-primary)]"
          >
            {writeNote ? "Hide Note" : "Write Note"}
          </button>
          <Counter max={max} value={value} onChange={onChange} />
        </div>
      </div>

      <div className={clsx(writeNote ? "flex" : "hidden", "flex-col gap-y-2")}>
        <hr className="text-[var(--color-border-secondary)] mb-2" />
        <span className="textL font-medium">Note:</span>
        <textarea
          value={note}
          onChange={(e) => onNoteChange?.(e.target.value)}
          maxLength={200}
          className="border border-[var(--color-border-secondary)] w-full rounded-md resize-none p-2"
        />
      </div>
    </div>
  );
}
