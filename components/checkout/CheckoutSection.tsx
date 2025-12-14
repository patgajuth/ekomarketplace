import React from "react";

export default function CheckoutSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="heading6 font-medium">{label}</h2>
      <div className="flex items-center gap-x-4 p-6 bg-[var(--color-tile)] border border-[var(--color-border-secondary)] rounded-md">
        {children}
      </div>
    </div>
  );
}
