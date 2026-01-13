import { Brand } from "@prisma/client";
import Tile from "./Tile";
import TileContainer from "./TileContainer";
import Link from "next/link";
import { getDataBrands } from "@/lib/data/getDataBrands";

export default async function BrandSection() {
  try {
    const brands = await getDataBrands({ fields: ["id", "name", "imageUrl"] });
    console.log("Brands:", brands);

    if (!brands.length) return null;

    return (
      <TileContainer title="Marki partnerskie">
        {brands.map((brand: Brand) => (
          <Link key={brand.id + brand.name} href={`/products?brand=${encodeURIComponent(brand.name)}`}>
            <Tile key={brand.id} imageURL={brand.imageUrl} title={brand.name} className="h-[46px]" />
          </Link>
        ))}
      </TileContainer>
    );
  } catch (err) {
    console.error("Błąd podczas pobierania marek:", err);
    return (
      <TileContainer title="Marki">
        <div className="p-8 text-center text-red-500">Nie udało się pobrać marek</div>
      </TileContainer>
    );
  }
}
