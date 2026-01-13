import SvgRightArrow from "@/components/icons/RightArrow";
import Button from "../../ui/Button";
import { Category } from "@prisma/client";

type CarouselSlideProps = {
  category: Category;
  onButtonClick: () => void;
};

export default function CarouselSlide({ category, onButtonClick }: CarouselSlideProps) {
  return (
    <section>
      <div className="absolute flex flex-col gap-y-8 max-w-[300px] sm:max-w-[420px] lg:max-w-[480px] left-6 sm:left-12 lg:left-16 bottom-8 sm:bottom-12">
        <div className="flex flex-col gap-y-4">
          <span className="textXS uppercase tracking-[0.28em] text-[var(--textColor-tertiary)]">
            Eco curated
          </span>
          <p className="heading3 font-medium text-[var(--textColor-primary)]">{category.name}</p>
          <div className="textM text-[var(--textColor-secondary)] leading-relaxed">{category.description}</div>
        </div>
        <Button
          onClick={onButtonClick}
          buttonStyle="fill"
          withRightIcon
          rightIcon={<SvgRightArrow />}
          className="w-max"
        >
          Explore Category
        </Button>
      </div>
      <div className="absolute flex justify-center w-1/2 h-full right-0">
        <img
          className="h-full object-contain drop-shadow-[0_30px_50px_rgba(16,86,48,0.2)]"
          src={category.imageUrl}
          alt={category.name}
        />
      </div>
    </section>
  );
}
