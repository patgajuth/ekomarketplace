"use client";

import React from "react";
import { OrderIcon } from "@/components/icons";
import { OrderItemDetail } from "./OrderItems";
import OrderItems from "./OrderItems";

export interface TransactionCardProps {
  id: number;
  createdAt: string;
  items: OrderItemDetail[];
}

export default function TransactionCard({ id, createdAt, items }: TransactionCardProps) {
  return (
    <div className="flex flex-col gap-y-4 p-4 border border-[var(--color-border-secondary)] bg-[var(--color-tile)] rounded-md">
      <div className="flex gap-x-4">
        <OrderIcon className="text-[var(--color-primary)]" />
        <div className="w-full flex flex-col gap-y-1">
          <span className="textM text-[var(--textColor-secondary)]">
            {new Date(createdAt).toLocaleString()}
          </span>
          <span className="textL font-medium">Order #{id}</span>
        </div>
      </div>
      <OrderItems items={items} />
    </div>
  );
}
