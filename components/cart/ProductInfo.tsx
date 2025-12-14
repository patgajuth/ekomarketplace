import Badge from "../ui/Badge";

type ProductInfoProps = {
  imageUrl: string;
  name: string;
  price: number;
  category: string;
};

function ProductInfo({ imageUrl, name, price, category }: ProductInfoProps) {
  return (
    <div className="flex gap-x-8">
      <div className="flex justify-center items-center p-3 border border-[var(--color-border-secondary)] rounded-lg w-[170px] h-[140px] overflow-hidden bg-[var(--color-tile)]">
        <div className="flex justify-center w-full h-full rounded-lg bg-base-white-2 overflow-hidden">
          <img src={imageUrl} alt={name} className="h-full object-contain rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-3">
          <span className="heading7 font-medium">{name}</span>
          <Badge text={category} className="w-max" />
        </div>
        <span className="heading6 font-medium">${price.toFixed(2)}</span>
      </div>
    </div>
  );
}
export default ProductInfo;
