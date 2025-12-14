import ProductsClient from "@/components/products/ProductsClient";
import { getDataBrands } from "@/lib/data/getDataBrands";
import { getDataCategories } from "@/lib/data/getDataCategories";

export default async function Page() {
  const cats = await getDataCategories({ fields: ["name"] });
  const brands = await getDataBrands({ fields: ["name"] });

  return (
    <ProductsClient
      optionsCategory={["All", ...cats.map((c) => c.name)]}
      optionsBrand={["All", ...brands.map((b) => b.name)]}
    />
  );
}
