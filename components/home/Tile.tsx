import clsx from "clsx";

type Tile = {
  imageURL: string;
  title: string;
  className?: string;
  showTitle?: boolean;
};

function Tile({ imageURL, title, className, showTitle = true }: Tile) {
  return (
    <div className="eco-card flex flex-col gap-y-6 items-center justify-center h-[190px] w-[220px] rounded-2xl cursor-pointer">
      <img src={imageURL} alt={`Zdjęcie ${title}`} className={clsx("rounded-lg object-contain", className)} />
      {showTitle ? (
        <span className="heading6 font-medium text-[var(--textColor-primary)]">{title}</span>
      ) : (
        <span className="sr-only">{title}</span>
      )}
    </div>
  );
}
export default Tile;
