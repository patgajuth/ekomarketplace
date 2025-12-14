"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import SuccessHeader from "@/components/success/SuccessHeader";
import TransactionDetails from "@/components/success/TransactionDetails";
import OrderList from "@/components/success/OrderList";
import SummaryDetails from "@/components/success/SummaryDetails";
import { useSuccessLogic } from "./useSuccessLogic";
import Loading from "@/components/ui/Loading";

export default function CheckoutSuccessPage() {
  const {
    status,
    invoiceNumber,
    transactionDate,
    paymentMethod,
    shippingMethod,
    items,
    totals,
  } = useSuccessLogic();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/login");
    return <div>Musisz być zalogowany, żeby zobaczyć sukces zamówienia.</div>;
  }
  
  if (status === "loading") {
    return <Loading text="Weryfikuję sesję…"/>;
  }

  if (!totals) {
    return <Loading text="Loading your order…"/>;
  }

  return (
    <div className="flex flex-col gap-y-6 p-6 border border-[var(--color-border-secondary)] bg-[var(--color-tile)] rounded-md w-[640px] mt-10">
      <SuccessHeader />
      <TransactionDetails
        invoiceNumber={invoiceNumber}
        transactionDate={transactionDate}
        paymentMethod={paymentMethod}
        shippingMethod={shippingMethod}
      />
      <OrderList items={items} />
      <SummaryDetails totals={totals} />
      <Button buttonStyle="fill" onClick={() => router.push("/")}>Continue Shopping</Button>
    </div>
  );
}
