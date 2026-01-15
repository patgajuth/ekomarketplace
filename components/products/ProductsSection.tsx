"use client";

import ProductCard from "@/components/products/ProductCard";
import Loading from "@/components/ui/Loading";
import { ProductWithCategory } from "./useProductsLogic";

type Props = {
  loading: boolean;
  error: boolean;
  products: ProductWithCategory[];
};

export default function ProductsSection({ loading, error, products }: Props) {
  if (loading) {
    return (
      <div className="flex flex-wrap w-full gap-x-12 gap-y-8">
        <Loading text="Ładowanie produktów..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-wrap w-full gap-x-12 gap-y-8">
        <div className="w-full text-center text-danger-500">Błąd ładowania danych</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-wrap w-full gap-x-12 gap-y-8">
        <div className="w-full text-center heading5">Brak produktów</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap w-full gap-8">
      {products.map(({ id, name, price, imageUrl, stock, discount, category }) => (
        <ProductCard
          key={id}
          id={id}
          category={category.name}
          imageURL={imageUrl}
          price={price}
          discount={discount}
          stock={stock}
          itemName={name}
        />
      ))}
    </div>
  );
}
