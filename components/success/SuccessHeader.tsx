import React from "react";
import { ConfirmIcon } from "@/components/icons";

type SuccessHeaderProps = {
  title?: string;
};

export default function SuccessHeader({
  title = "Thanks for Your Order!",
}: SuccessHeaderProps) {
  return (
    <div className="flex justify-center items-center flex-col gap-y-6">
      <ConfirmIcon className="text-success-500 display2" />
      <span className="heading5 font-medium">{title}</span>
    </div>
  );
}