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
      <div className="absolute flex flex-col gap-y-10 w-[433px] left-[120px] bottom-20">
        <div className="flex flex-col gap-y-6">
          <p className="heading4 font-medium">{category.name}</p>
          <div className="textM text-[var(--textColor-secondary)]">{category.description}</div>
        </div>
        <Button
          onClick={onButtonClick}
          buttonStyle="stroke"
          withRightIcon
          rightIcon={<SvgRightArrow />}
          className="w-max"
        >
          Explore Category
        </Button>
      </div>
      <div className="absolute flex justify-center w-1/2 h-full right-0">
        <img className="h-full object-contain" src={category.imageUrl} alt={category.name} />
      </div>
    </section>
  );
}
