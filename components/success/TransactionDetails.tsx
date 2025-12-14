import React from "react";
import Detail from "./Detail";

type TransactionDetailsProps = {
  invoiceNumber: string;
  transactionDate: string;
  paymentMethod: string;
  shippingMethod: string;
};

export default function TransactionDetails({
  invoiceNumber,
  transactionDate,
  paymentMethod,
  shippingMethod,
}: TransactionDetailsProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="textM font-medium text-center">{invoiceNumber}</div>
      <div className="flex flex-col gap-y-4">
        <Detail label="Transaction Date" value={transactionDate} />
        <Detail label="Payment Method" value={paymentMethod} />
        <Detail label="Shipping Method" value={shippingMethod} />
      </div>
    </div>
  );
}

