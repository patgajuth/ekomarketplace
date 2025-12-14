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
        className="flex justify-center items-center absolute left-0 top-1/2 -translate-y-1/2 w-11 h-[74px] bg-[var(--color-primary)] rounded-r-md cursor-pointer hover:bg-[var(--color-secondary)]"
      >
        <SvgDropDown className="rotate-90 text-[var(--color-tile)]" />
      </button>
      <button
        onClick={onNext}
        className="flex justify-center items-center absolute right-0 top-1/2 -translate-y-1/2 w-11 h-[74px] bg-[var(--color-primary)] rounded-l-md cursor-pointer hover:bg-[var(--color-secondary)]"
      >
        <SvgDropDown className="-rotate-90 text-[var(--color-tile)]" />
      </button>
    </>
  );
}
