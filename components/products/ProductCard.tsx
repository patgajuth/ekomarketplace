"use client";

import Image from "next/image";
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
      <div className="eco-card flex flex-col gap-y-4 items-center p-5 rounded-2xl w-[300px] cursor-pointer group">
        <div className="flex justify-center items-center relative rounded-2xl bg-[var(--color-panel)] w-full h-[200px] overflow-hidden border border-[var(--color-panel-border)]">
          <Image
            src={imageURL}
            alt={itemName}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.04]"
          />
          <button
            onClick={handleAddToCart}
            className={clsx(
              "w-9 h-9 p-1 rounded-full bg-[var(--color-tile)]/90 absolute top-4 left-4 flex items-center justify-center cursor-pointer",
              "border border-[var(--color-border-primary)] shadow-sm transition-all duration-200 backdrop-blur",
              stock === 0 && "cursor-not-allowed opacity-50",
              stock > 0 && "hover:bg-[var(--color-primary-50)] hover:border-primary-200 hover:shadow-md",
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
              <span className="heading5 font-semibold">{finalPrice.toFixed(2)} zł</span>
              {discount !== 0 && <span className="textL line-through">{price.toFixed(2)} zł</span>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
