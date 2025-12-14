"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";
import { DropDownIcon, CheckIcon } from "../../icons";
import { useDropdown } from "./useDropdown";

type DropdownProps = {
  sizeDropdown?: "xxl" | "xl" | "l" | "m" | "s" | "xs";
  options: string[];
  className?: string;
  name?: string;
  placeholder?: string;
  onChange?: (selected: string) => void;
  value?: string;
};

const sizingMap = {
  xxl: "textL py-4",
  xl: "textM py-3.5",
  l: "textM py-3",
  m: "textS py-2.5",
  s: "textS py-2",
  xs: "textXS py-1.5",
};

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  ({ sizeDropdown = "l", options, className, name, placeholder, onChange, value }, ref) => {
    const { isOpen, selected, dropdownRef, toggleOpen, selectOption } = useDropdown({
      options,
      placeholder,
      value,
      onChange,
    });
    const sizing = sizingMap[sizeDropdown];

    return (
      <div className="relative" ref={dropdownRef}>
        <select name={name} ref={ref} value={selected ?? ""} onChange={() => {}} hidden>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={toggleOpen}
          className={clsx(
            "border rounded-md flex items-center gap-x-4 justify-between h-max px-4",
            "bg-[var(--color-tile)] border-[var(--color-border-primary)]",
            "text-[var(--textColor-primary)] focus:outline-none",
            "focus:ring-2 focus:ring-primary-50 focus:border-primary-300",
            sizing,
            className
          )}
        >
          <span>{selected ?? placeholder ?? "Wybierz"}</span>
          <DropDownIcon />
        </button>

        {isOpen && (
          <div
            className={clsx(
              sizing,
              "absolute flex flex-col gap-y-1 p-4 z-50 mt-1.5 w-full",
              "bg-[var(--color-tile)] rounded-md border border-[var(--color-border-primary)]",
              "max-h-30 overflow-y-auto"
            )}
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => selectOption(opt)}
                className={clsx(
                  "flex items-center justify-between px-2 py-2 cursor-pointer",
                  "hover:bg-[var(--color-border-primary)]",
                  selected === opt && "bg-[var(--color-border-secondary)]"
                )}
              >
                <span>{opt}</span>
                {selected === opt && <CheckIcon />}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
export default Dropdown;
