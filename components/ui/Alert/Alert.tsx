"use client";

import React from "react";
import clsx from "clsx";
import { ConfirmIcon, CrossIcon, DangerIcon, WarningIcon } from "@/components/icons";
import { useAlert } from "./useAlert";

type AlertProps = {
  message: string;
  type: "success" | "warning" | "danger";
  onClose?: () => void;
  duration?: number;
};

const typeClasses = {
  success: "bg-success-700 border-b border-success-500",
  warning: "bg-warning-700 border-b border-warning-500",
  danger:  "bg-danger-700 border-b border-danger-500",
};

const typeIcons = {
  success: <ConfirmIcon className="text-success-400 h-[22px]" />,
  warning: <WarningIcon className="text-warning-400 h-[22px]" />,
  danger:  <DangerIcon className="text-danger-400 h-[22px]" />,
};

export default function Alert({ message, type, duration, onClose }: AlertProps) {
  const { isVisible, close } = useAlert({ duration, onClose });

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 text-white shadow-md",
        typeClasses[type]
      )}
    >
      <div className="flex items-center gap-x-4">
        {typeIcons[type]}
        <span className="heading7 font-medium">{message}</span>
      </div>
      <button onClick={close} aria-label="Zamknij alert">
        <CrossIcon className="text-white h-[20px] rotate-45" />
      </button>
    </div>
  );
}
