import React from "react";
import Button from "@/components/ui/Button";

type SummaryPanelProps = {
  totalProductPrice: number;
  totalProtection: number;
  shippingPrice: number;
  insurance: number;
  serviceFee: number;
  grandTotal: number;
  onPay: () => void;
};

export default function SummaryPanel({
  totalProductPrice,
  totalProtection,
  shippingPrice,
  insurance,
  serviceFee,
  grandTotal,
  onPay,
}: SummaryPanelProps) {
  return (
    <div className="flex flex-col border border-[var(--color-border-secondary)] bg-[var(--color-tile)] rounded-md gap-y-6 p-6 w-[500px] h-max">
      <div className="flex flex-col textM font-semibold gap-y-4">
        <div className="flex justify-between">
          <span>Suma produktów</span>
          <span className="textL">{totalProductPrice.toFixed(2)} zł</span>
        </div>
        <div className="flex justify-between">
          <span>Suma ochrony produktów</span>
          <span className="textL">{totalProtection} zł</span>
        </div>
        <div className="flex justify-between">
          <span>Koszt dostawy</span>
          <span className="textL">{shippingPrice} zł</span>
        </div>
        <div className="flex justify-between">
          <span>Ubezpieczenie przesyłki</span>
          <span className="textL">{insurance} zł</span>
        </div>
      </div>

      <hr className="text-[var(--color-border-secondary)]" />

      <div className="flex flex-col textM font-semibold gap-y-4">
        <div className="flex justify-between">
          <span>Opłata serwisowa</span>
          <span className="textL">{serviceFee.toFixed(2)} zł</span>
        </div>
      </div>

      <hr className="text-[var(--color-border-secondary)]" />

      <div className="flex flex-col gap-y-8">
        <div className="flex justify-between items-center textM font-semibold">
          <span>Razem</span>
          <span className="heading5 font-medium">{grandTotal.toFixed(2)} zł</span>
        </div>
        <Button buttonStyle="fill" onClick={onPay}>
          Zapłać teraz
        </Button>
      </div>
    </div>
  );
}
