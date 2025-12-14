import clsx from "clsx";

type CarouselDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function CarouselDots({ count, activeIndex, onSelect }: CarouselDotsProps) {
  return (
    <div className="flex items-center gap-x-4">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={clsx(
            "rounded-full cursor-pointer",
            index === activeIndex ? "w-4 h-4 bg-[var(--color-secondary)]" : "w-3 h-3 bg-[var(--color-border-primary)]"
          )}
        />
      ))}
    </div>
  );
}
