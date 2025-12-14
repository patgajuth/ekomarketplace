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
      stroke: "text-primary-500 border border-primary-500 rounded-md",
      fill: "text-[var(--background)] bg-primary-500 rounded-md",
      text: "text-primary-500",
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
      stroke: "hover:border-primary-400 transform:border duration-200",
      fill: "hover:bg-primary-600 transform:bg duration-200",
      text: "hover:text-primary-600 transform:text duration-200",
    };
    const pressedButton = {
      stroke: "active:border-primary-400 active:text-primary-400",
      fill: "active:bg-primary-700",
      text: "active:text-primary-400",
    };
    const disabledButton = {
      stroke: "disabled:border-primary-300 disabled:text-primary-300",
      fill: "disabled:bg-primary-200",
      text: "disabled:text-primary-300",
    };

    return (
      <button
        ref={ref}
        type={rest.type ?? "button"}
        className={clsx(
          "flex items-center justify-center gap-x-3.5 px-5 cursor-pointer h-max disabled:cursor-not-allowed",
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
