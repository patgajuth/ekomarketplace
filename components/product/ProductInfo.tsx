import { useState } from "react";
import Badge from "@/components/ui/Badge";
import clsx from "clsx";
import { ShieldIcon } from "@/components/icons";

type ProductInfoProps = {
  name: string;
  category: string;
  price: number;
  description: string;
  exploreInfo: string;
  shippingEstimate: string;
};

export default function ProductInfo({
  name,
  category,
  price,
  description,
  exploreInfo,
  shippingEstimate,
}: ProductInfoProps) {
  const [viewMore, setViewMore] = useState(false);
  return (
    <div className="flex flex-col gap-y-8 w-[430px]">
      <div className="flex flex-col gap-y-5">
        <span className="heading5 font-medium">{name}</span>
        <Badge className="w-max" text={category} />
      </div>
      <span className="heading4 font-medium">${price}</span>
      <div className="flex flex-col gap-y-1 textM text-[var(--textColor-secondary)]">
        <div>{description}</div>
        <div className={clsx(viewMore ? "" : "hidden")}>{exploreInfo}</div>
        <button
          onClick={() => setViewMore((v) => !v)}
          className="text-[var(--color-primary)] cursor-pointer text-start w-max"
        >
          {viewMore ? "View Less" : "View More"}
        </button>
      </div>
      <div className="flex flex-col gap-y-3.5">
        <span className="text-[var(--textColor-tertiary)] textL">Shipping Available</span>
        <div className="flex gap-x-2 p-4 border rounded-md border-[var(--color-border-primary)] w-max">
          <ShieldIcon className="text-success-500 text-xl" />
          <div className="flex flex-col gap-y-1 textM">
            <span className="font-medium">NexusHub Courier</span>
            <span className="text-[var(--textColor-tertiary)]">
              Estimated arrival {shippingEstimate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}