import clsx from "clsx";

export default function AddressButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-1/2 py-2 font-medium border-b-2 transition-colors duration-200 cursor-pointer",
        isActive
          ? "text-[var(--color-primary)] border-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)]"
          : "text-[var(--textColor-tertiary)] border-[var(--color-border-secondary)] hover:text-[var(--color-secondary)] hover:border-[var(--color-secondary)]"
      )}
    >
      {label}
    </button>
  );
}
