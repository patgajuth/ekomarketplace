"use client";

import React from "react";
import { OrderItemDetail } from "./OrderItems";
import TransactionCard from "./TransactionCard";

export interface OrderWithItems {
  id: number;
  createdAt: string;
  items: OrderItemDetail[];
}

export default function TransactionsList({ orders }: { orders: OrderWithItems[] }) {
  if (orders.length === 0) {
    return <p className="heading5">Not found transactions</p>;
  }

  return (
    <div className="flex flex-col gap-y-8 w-full">
      <h2 className="text-xl w-1/2 text-center border-b font-medium text-[var(--color-primary)] border-[var(--color-primary)]">
        Transactions
      </h2>
      {orders.map((order) => (
        <TransactionCard key={order.id} id={order.id} createdAt={order.createdAt} items={order.items} />
      ))}
    </div>
  );
}
