"use client";

import React from "react";
import { TrashcanIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import CartProductItem from "@/components/cart/CartProductItem";
import { useCartLogic } from "./useCartLogic";

export default function Cart() {
  
  const {
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
  } = useCartLogic();



  return (
    <div className="flex gap-x-12 items-start w-full p-10">
      <div className="flex flex-col w-full gap-y-8">
        {products.length > 1 && <Checkbox text="Select All" checked={selectAll} onChange={toggleSelectAll} />}

        {products.length === 0 ? (
          <div className="heading4 w-full text-center">Koszyk pusty</div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="relative flex gap-x-6">
              <Checkbox checked={selectedItems.has(p.id)} onChange={() => toggleSelectItem(p.id)} />
              <CartProductItem
                category={p.category.name}
                imageUrl={p.imageUrl}
                name={p.name}
                price={p.price}
                max={p.stock}
                value={p.quantity}
                note={p.note}
                onChange={(v) => updateQuantity(p.id, v)}
                onNoteChange={(txt) => updateNote(p.id, txt)}
              />
              <button onClick={() => removeItem(p.id)} className="absolute top-4 right-4 cursor-pointer">
                <TrashcanIcon className="text-danger-500" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col border border-[var(--color-border-secondary)] bg-[var(--color-tile)] rounded-md gap-y-6 p-6 w-[500px]">
        <div className="flex flex-col textM font-semibold gap-y-4">
          <span>Total Products</span>
          <div className="flex justify-between textM font-medium">
            Total Price ({selectedCount} items)
            <span className="textL">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <hr className="text-[var(--color-border-secondary)]" />
        <div className="flex justify-between items-center textL font-medium">
          Subtotal
          <span className="heading5">${subtotal.toFixed(2)}</span>
        </div>
        <Button
          buttonStyle="fill"
          onClick={handleCheckout}
          disabled={!canCheckout}
          className={!canCheckout ? "opacity-50 cursor-not-allowed" : ""}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
