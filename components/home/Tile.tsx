import Image from "next/image";
import clsx from "clsx";

type Tile = {
  imageURL: string;
  title: string;
  className?: string;
  showTitle?: boolean;
  containerClassName?: string;
};

function Tile({ imageURL, title, className, showTitle = true, containerClassName }: Tile) {
  return (
    <div
      className={clsx(
        "eco-card flex flex-col gap-y-6 items-center justify-center text-center h-[190px] w-[220px] rounded-2xl cursor-pointer",
        containerClassName
      )}
    >
      <div className={clsx("relative h-[80px] w-[80px]", className)}>
        <Image
          src={imageURL}
          alt={`Zdjęcie ${title}`}
          fill
          sizes="80px"
          className="rounded-lg object-contain"
        />
      </div>
      {showTitle ? (
        <span className="textS font-medium text-[var(--textColor-primary)]">{title}</span>
      ) : (
        <span className="sr-only">{title}</span>
      )}
    </div>
  );
}
export default Tile;
