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
            "rounded-full cursor-pointer transition-all duration-200",
            index === activeIndex
              ? "w-4 h-4 bg-primary-600 shadow-sm"
              : "w-3 h-3 bg-primary-200 hover:bg-primary-300"
          )}
        />
      ))}
    </div>
  );
}
