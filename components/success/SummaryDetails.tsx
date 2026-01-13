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
      <Line label={`Suma produktów (${totals.totalItems} szt.)`} value={totals.totalProductPrice} />
      <Line label="Suma ochrony produktów" value={totals.totalProtection} />
      <Line label="Koszt dostawy" value={totals.shippingPrice} />
      <Line label="Ubezpieczenie przesyłki" value={totals.shippingInsurance} />
      <hr className="text-[var(--color-border-secondary)]" />
      <span className="textL font-medium">Opłaty transakcyjne</span>
      <Line label="Opłata serwisowa" value={totals.serviceFee} />
      <hr className="text-[var(--color-border-secondary)]" />
      <div className="flex justify-between items-center">
        <span className="textL font-medium">Razem</span>
        <span className="heading5 font-medium">{totals.grandTotal.toFixed(2)} zł</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="textM font-medium">Status</span>
        <Badge type={status} size="l" text={statusLabel(status)} />
      </div>
    </div>
  );
}

function statusLabel(status: SummaryDetailsProps["status"]) {
  switch (status) {
    case "success":
      return "Sukces";
    case "pending":
      return "W toku";
    case "failed":
      return "Nieudane";
    default:
      return "Nieznany";
  }
}
