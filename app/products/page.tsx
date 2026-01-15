import ProductsClient from "@/components/products/ProductsClient";
import { getDataBrands } from "@/lib/data/getDataBrands";
import { getDataCategories } from "@/lib/data/getDataCategories";

export default async function Page() {
  const cats = await getDataCategories({ fields: ["name"] });
  const brands = await getDataBrands({ fields: ["name"] });

  return (
    <ProductsClient
      optionsCategory={["Wszystkie", ...cats.map((c) => c.name)]}
      optionsBrand={["Wszystkie", ...brands.map((b) => b.name)]}
    />
  );
}
