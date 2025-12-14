import clsx from "clsx";

type LogoProps = {
  size: "primary" | "secondary";
};

export default function Logo({ size }: LogoProps) {
  const sizeLogo = {
    primary: "heading3",
    secondary: "heading5",
  };
  return (
    <span className={clsx(sizeLogo[size], "font-semibold")}>
      <span className="text-[var(--color-primary)]">
        Eko<span className="text-[var(--color-secondary)]">Market</span>
      </span>
      Place
    </span>
  );
}
