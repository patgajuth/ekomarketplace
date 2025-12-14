"use client";

import React from "react";
import OrderList from "@/components/checkout/OrderList";
import AddressSection from "@/components/checkout/AddressSection";
import SummaryPanel from "@/components/checkout/SummaryPanel";
import CheckoutSection from "@/components/checkout/CheckoutSection";
import { ShieldIcon } from "@/components/icons";
import PaymentLogo from "@/components/footer/PaymentLogo";
import { useCheckoutLogic } from "./useCheckoutLogic";
import Loading from "@/components/ui/Loading";

export default function CheckoutPage() {
  const {
    status,
    items,
    protections,
    setAddress,
    setMakeMain,
    toggleProtection,
    totalProductPrice,
    totalProtection,
    grandTotal,
    handlePay,
  } = useCheckoutLogic();
  

  if (status === "loading") {
    return <Loading text="Verifying the session..."/>;
  }

  return (
    <div className="flex w-full gap-x-12 px-10">
      <div className="flex flex-col w-full gap-y-10">
        <CheckoutSection label="Your Order">
          <OrderList items={items} protections={protections} onToggleProtection={toggleProtection} />
        </CheckoutSection>

        <CheckoutSection label="Address">
          <AddressSection onAddressChange={setAddress} onMakeMainChange={setMakeMain} />
        </CheckoutSection>

        <CheckoutSection label="Shipping">
          <ShieldIcon className="text-success-500" /> NexusHub Courier
        </CheckoutSection>

        <CheckoutSection label="Payment Method">
          <div className="flex items-center gap-x-2">
            <PaymentLogo imgSrc="https://i.ibb.co/wZLxPRLy/apple-pay.png" alt="ApplePay" />
            ApplePay
          </div>
        </CheckoutSection>
      </div>

      <SummaryPanel
        totalProductPrice={totalProductPrice}
        totalProtection={totalProtection}
        shippingPrice={5}
        insurance={6}
        serviceFee={0.5}
        grandTotal={grandTotal}
        onPay={handlePay}
      />
    </div>
  );
}
