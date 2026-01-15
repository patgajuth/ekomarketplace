import { getDataCategories } from "@/lib/data/getDataCategories";
import Carousel from "./Carousel";

export default async function CarouselWrapper() {
  const categories = await getDataCategories();

  if (!categories.length) return null;

  return <Carousel categories={categories} />;
}
