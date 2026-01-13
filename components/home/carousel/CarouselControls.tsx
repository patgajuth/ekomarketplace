import SvgDropDown from "@/components/icons/DropDown";

type CarouselControlsProps = {
  onPrev: () => void;
  onNext: () => void;
};

export default function CarouselControls({ onPrev, onNext }: CarouselControlsProps) {
  return (
    <>
      <button
        onClick={onPrev}
        className="flex justify-center items-center absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-[var(--color-tile)]/90 border border-[var(--color-border-primary)] rounded-full cursor-pointer shadow-md backdrop-blur transition-all duration-200 hover:bg-[var(--color-primary-50)] hover:border-primary-200"
      >
        <SvgDropDown className="rotate-90 text-[var(--color-primary-700)]" />
      </button>
      <button
        onClick={onNext}
        className="flex justify-center items-center absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-[var(--color-tile)]/90 border border-[var(--color-border-primary)] rounded-full cursor-pointer shadow-md backdrop-blur transition-all duration-200 hover:bg-[var(--color-primary-50)] hover:border-primary-200"
      >
        <SvgDropDown className="-rotate-90 text-[var(--color-primary-700)]" />
      </button>
    </>
  );
}
