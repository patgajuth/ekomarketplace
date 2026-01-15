import clsx from "clsx";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  buttonStyle?: "text" | "fill" | "stroke";
  buttonSize?: "xxl" | "xl" | "l" | "m" | "s" | "xs";
  withLeftIcon?: boolean;
  leftIcon?: React.ReactNode;
  withRightIcon?: boolean;
  rightIcon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      buttonStyle = "text",
      buttonSize = "l",
      withLeftIcon,
      leftIcon,
      withRightIcon,
      rightIcon,
      ...rest
    },
    ref
  ) => {
    const styling = {
      stroke: "text-primary-700 border border-primary-400 bg-[var(--color-tile)]/80 rounded-full",
      fill: "text-[var(--color-base-white)] bg-gradient-to-r from-primary-500 to-primary-700 rounded-full shadow-sm",
      text: "text-primary-700",
    };
    const sizing = {
      xxl: "py-4 textL font-medium",
      xl: "py-3.5 textM font-medium",
      l: "py-3 textM font-medium",
      m: "py-2.5 textS font-medium",
      s: "py-2 textS font-medium",
      xs: "py-1.5 textXS font-medium",
    };
    const hoverButton = {
      stroke: "hover:border-primary-300 hover:bg-primary-50",
      fill: "hover:from-primary-600 hover:to-primary-800 hover:shadow-md",
      text: "hover:text-primary-600",
    };
    const pressedButton = {
      stroke: "active:border-primary-500 active:text-primary-600",
      fill: "active:from-primary-700 active:to-primary-900",
      text: "active:text-primary-500",
    };
    const disabledButton = {
      stroke: "disabled:border-primary-200 disabled:text-primary-300",
      fill: "disabled:from-primary-200 disabled:to-primary-300 disabled:shadow-none",
      text: "disabled:text-primary-300",
    };

    return (
      <button
        ref={ref}
        type={rest.type ?? "button"}
        className={clsx(
          "flex items-center justify-center gap-x-3.5 px-5 cursor-pointer h-max disabled:cursor-not-allowed",
          "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200",
          styling[buttonStyle],
          sizing[buttonSize],
          hoverButton[buttonStyle],
          pressedButton[buttonStyle],
          disabledButton[buttonStyle],
          className
        )}
        {...rest}
      >
        {withLeftIcon && leftIcon}
        {children}
        {withRightIcon && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
