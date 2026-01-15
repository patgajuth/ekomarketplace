"use client";
import React from "react";
import clsx from "clsx";

type InputFieldProps = {
  sizeInput?: "xxl" | "xl" | "l" | "m" | "s" | "xs";
  variant?: "stroke" | "leftButton";
  destructive?: boolean;
  withLabel?: boolean;
  label?: string;
  withLeftIcon?: boolean;
  leftIcon?: React.ReactNode;
  withRightIcon?: boolean;
  rightIcon?: React.ReactNode;
  withSupportText?: boolean;
  supportText?: string;
  textButton?: string;
  errorMessage?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      sizeInput = "l",
      variant = "stroke",
      destructive,
      withLabel,
      label,
      withLeftIcon,
      leftIcon,
      withRightIcon,
      rightIcon,
      withSupportText,
      supportText,
      textButton,
      errorMessage,
      className,
      ...inputProps
    },
    ref
  ) => {
    const sizing = {
      label: {
        xxl: "textL font-medium",
        xl: "textL font-medium",
        l: "textL font-medium",
        m: "textM font-medium",
        s: "textM font-medium",
        xs: "textS font-medium",
      },
      input: {
        xxl: "py-4 textL",
        xl: "py-3.5 textM",
        l: "py-3 textM",
        m: "py-2.5 textS",
        s: "py-2 textS",
        xs: "py-1.5 textXS",
      },
      supportText: {
        xxl: "textS",
        xl: "textS",
        l: "textS",
        m: "textS",
        s: "textXS",
        xs: "textXXS",
      },
    };

    return (
      <div className="flex flex-col w-full gap-y-4">
        {withLabel && <span className={clsx(sizing.label[sizeInput], "text-[var(--textColor-primary)]")}>{label}</span>}
        <div className="flex flex-col gap-y-2">
          <div
            className={clsx(
              "group flex w-full rounded-md",
              "focus-within:outline-2",
              destructive ? "focus-within:outline-danger-50" : "focus-within:outline-primary-50"
            )}
          >
            <div
              className={clsx(
                "flex items-center gap-x-4 px-[18px] border w-full h-max rounded-l-md bg-[var(--color-tile)]",
                variant === "stroke" && "rounded-r-md",
                sizing.input[sizeInput],
                destructive
                  ? "border-danger-300 group-focus-within:border-danger-300"
                  : "border-[var(--color-border-primary)] group-focus-within:border-primary-300",
                className
              )}
            >
              {variant === "stroke" && withLeftIcon && leftIcon}
              <input ref={ref} className="w-full focus:outline-none bg-transparent" {...inputProps} />
              {variant === "stroke" && withRightIcon && rightIcon}
            </div>

            {variant === "leftButton" && (
              <button
                type="button"
                className={clsx(
                  "flex items-center gap-x-4 px-[18px] border border-l-0 rounded-r-md bg-[var(--color-tile)]",
                  sizing.input[sizeInput],
                  destructive
                    ? "border-danger-300 group-focus-within:border-danger-300"
                    : "border-[var(--color-border-primary)] group-focus-within:border-primary-300"
                )}
              >
                {textButton}
                {withRightIcon && rightIcon}
              </button>
            )}
          </div>

          {withSupportText && (
            <span
              className={clsx(
                sizing.supportText[sizeInput],
                destructive ? "text-danger-500" : "text-[var(--textColor-tertiary)]"
              )}
            >
              {destructive ? errorMessage : supportText}
            </span>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
