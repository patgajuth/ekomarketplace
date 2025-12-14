import clsx from "clsx";

type Tile = {
  imageURL: string;
  title: string;
  className?: string;
};

function Tile({ imageURL, title, className }: Tile) {
  return (
    <div className="flex flex-col gap-y-6 items-center justify-center h-[190px] w-[220px] bg-[var(--color-tile)] border border-[var(--color-border-primary)] rounded-lg hover:scale-102 transition-transform duration-300 cursor-pointer">
      <img src={imageURL} alt={`${title} Image`} className={clsx("rounded-lg object-contain", className)} />
      <span className="heading6 font-medium">{title}</span>
    </div>
  );
}
export default Tile;
