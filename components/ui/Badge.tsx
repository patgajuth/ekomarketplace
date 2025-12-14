import clsx from "clsx";

type BadgeProps = {
  type?: "default" | "success" | "failed" | "pending";
  size?: "l" | "m" | "s";
  className?: string;
  text: string;
};

function Badge({ type = "default", size = "l", className, text }: BadgeProps) {
  const sizeBadge = {
    l: "py-1.5 textS font-medium",
    m: "py-0.5 textXS font-medium",
    s: "py-0 textXXS font-medium",
  };
  const typeBadge = {
    default: "bg-primary-500",
    success: "bg-success-500",
    failed: "bg-danger-500",
    pending: "bg-warning-500",
  };
  return (
    <div className={clsx(typeBadge[type], "px-3.5 font-medium rounded-md w-max", sizeBadge[size], className)}>
      {text}
    </div>
  );
}
export default Badge;
