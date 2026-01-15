import React from "react";
import clsx from "clsx";
import { CheckIcon } from "../icons";

type CheckboxProps = {
  sizeCheckbox?: "l" | "m" | "s";
  text?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const sizing = {
  text: { l: "gap-x-4 textM", m: "gap-x-3 textS", s: "gap-x-3 textXS" },
  checkbox: { l: "w-[26px] h-[26px]", m: "w-[18px] h-[18px]", s: "w-[18px] h-[18px]" },
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ sizeCheckbox = "l", text, className, ...props }, ref) => {
    return (
      <label className={clsx("flex items-center", sizing.text[sizeCheckbox], className)}>
        <div className={clsx("relative", sizing.checkbox[sizeCheckbox])}>
          <input
            type="checkbox"
            ref={ref}
            className="peer absolute w-full h-full z-10 opacity-0 cursor-pointer"
            {...props}
          />
          <div className="pointer-events-none absolute inset-0 border bg-[var(--color-tile)] border-[var(--color-border-primary)] peer-checked:bg-[var(--color-secondary)] peer-checked:border-[var(--color-secondary)] rounded-md" />
          <CheckIcon className="absolute inset-0 m-auto text-[var(--background)] peer-not-checked:hidden" />
        </div>
        {text && <span>{text}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
