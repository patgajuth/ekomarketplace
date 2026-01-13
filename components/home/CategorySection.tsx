import Link from "next/link";
import Tile from "./Tile";
import TileContainer from "./TileContainer";
import { getDataCategories } from "@/lib/data/getDataCategories";

export default async function CategorySection() {
  try {
    const categories = await getDataCategories({
      fields: ["id", "name", "iconUrl"],
    });

    if (!categories.length) return null;

    return (
      <TileContainer title="Kategorie żywności">
        {categories.map((cat) => (
          <Link key={cat.id + cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`}>
            <Tile imageURL={cat.iconUrl} title={cat.name} className="h-[80px]" />
          </Link>
        ))}
      </TileContainer>
    );
  } catch (err) {
    console.error("Błąd podczas pobierania kategorii:", err);
    return (
      <TileContainer title="Kategorie">
        <div className="p-8 text-center text-red-500">Nie udało się pobrać kategorii</div>
      </TileContainer>
    );
  }
}
