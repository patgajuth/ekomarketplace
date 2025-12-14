import React from "react";
import Badge from "@/components/ui/Badge";
import Line from "./Line";

type SummaryDetailsProps = {
  totals: {
    totalItems: number;
    totalProductPrice: number;
    totalProtection: number;
    shippingPrice: number;
    shippingInsurance: number;
    serviceFee: number;
    grandTotal: number;
  };
  status?: "success" | "pending" | "failed";
};

export default function SummaryDetails({ totals, status = "success" }: SummaryDetailsProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <Line label={`Total Product Price (${totals.totalItems} Item)`} value={totals.totalProductPrice} />
      <Line label="Total Product Protection" value={totals.totalProtection} />
      <Line label="Total Shipping Price" value={totals.shippingPrice} />
      <Line label="Shipping Insurance" value={totals.shippingInsurance} />
      <hr className="text-[var(--color-border-secondary)]" />
      <span className="textL font-medium">Transaction Fees</span>
      <Line label="Service Fees" value={totals.serviceFee} />
      <hr className="text-[var(--color-border-secondary)]" />
      <div className="flex justify-between items-center">
        <span className="textL font-medium">Grand total</span>
        <span className="heading5 font-medium">${totals.grandTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="textM font-medium">Status</span>
        <Badge type={status} size="l" text={capitalize(status)} />
      </div>
    </div>
  );
}


function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
