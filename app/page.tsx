import BrandSection from "@/components/home/BrandSection";
import CategorySection from "@/components/home/CategorySection";
import RecommendationSection from "@/components/home/RecommendationSection";
import CarouselWrapper from "@/components/home/carousel/CarouselWrapper";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-20 w-full">
      <CarouselWrapper />
      <CategorySection />
      <RecommendationSection />
      <BrandSection />
    </div>
  );
}
