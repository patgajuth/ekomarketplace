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
          <span>Total Product Price</span>
          <span className="textL">${totalProductPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Product Protection</span>
          <span className="textL">${totalProtection}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Shipping Price</span>
          <span className="textL">${shippingPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Insurance</span>
          <span className="textL">${insurance}</span>
        </div>
      </div>

      <hr className="text-[var(--color-border-secondary)]" />

      <div className="flex flex-col textM font-semibold gap-y-4">
        <div className="flex justify-between">
          <span>Service Fees</span>
          <span className="textL">${serviceFee.toFixed(2)}</span>
        </div>
      </div>

      <hr className="text-[var(--color-border-secondary)]" />

      <div className="flex flex-col gap-y-8">
        <div className="flex justify-between items-center textM font-semibold">
          <span>Grand Total</span>
          <span className="heading5 font-medium">${grandTotal.toFixed(2)}</span>
        </div>
        <Button buttonStyle="fill" onClick={onPay}>
          Pay Now
        </Button>
      </div>
    </div>
  );
}