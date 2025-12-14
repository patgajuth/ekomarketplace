"use client";

import Link from "next/link";
import { CartIcon } from "../icons";
import Badge from "../ui/Badge";
import { useCart } from "@/hooks/useCart";
import clsx from "clsx";

type ProductCardProps = {
  id: number;
  imageURL: string;
  category: string;
  itemName: string;
  price: number;
  discount: number;
  stock?: number;
};

export default function ProductCard({
  id,
  imageURL,
  category,
  itemName,
  price,
  discount,
  stock = 0,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(id.toString(), itemName, 1, stock);
  };

  const finalPrice = discount !== 0 ? price - discount : price;

  return (
    <Link href={`/products/${id}`}>
      <div className="flex flex-col gap-y-4 items-center p-4 border border-[var(--color-border-primary)] bg-[var(--color-tile)] rounded-lg w-[300px] cursor-pointer hover:scale-102 transition-transform duration-300">
        <div className="flex justify-center items-center relative rounded-xl bg-base-white-2 w-full overflow-hidden">
          <img src={imageURL} alt={itemName} className="h-[200px] object-contain rounded-xl" />
          <button
            onClick={handleAddToCart}
            className={clsx(
              "w-8 h-8 p-1 rounded-md bg-[var(--color-tile)] absolute top-4 left-4 flex items-center justify-center cursor-pointer",
              "border border-[var(--color-border-primary)] shadow-sm transition-colors duration-200",
              stock === 0 && "cursor-not-allowed opacity-50",
              stock > 0 && "hover:bg-[var(--color-primary-50)]",
              stock > 0 && "active:bg-[var(--color-primary-100)]"
            )}
          >
            <CartIcon className="text-[var(--color-primary-700)]" />
          </button>
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          <Badge className="w-max" size="l" text={category} />
          <div className="flex flex-col gap-y-2">
            <span className="textL">{itemName}</span>
            <div className="flex gap-x-2.5 items-center">
              <span className="heading5 font-semibold">${finalPrice.toFixed(2)}</span>
              {discount !== 0 && <span className="textL line-through">${price.toFixed(2)}</span>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
