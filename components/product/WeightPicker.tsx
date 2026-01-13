import clsx from "clsx";
import { useState } from "react";

type WeightOption = { label: string; value: string };

type WeightPickerProps = {
  options: WeightOption[];
  onSelect: (value: string) => void;
};

export default function WeightPicker({ options, onSelect }: WeightPickerProps) {
  const [selected, setSelected] = useState(options[0]?.value ?? "");

  const handleClick = (value: string) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="flex flex-col gap-y-3.5">
      <span className="textL font-medium text-[var(--textColor-tertiary)]">Waga</span>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={clsx(
              "px-4 py-2 rounded-full border textS font-medium transition-colors",
              selected === option.value
                ? "bg-primary-600 text-white border-primary-600"
                : "bg-[var(--color-tile)] border-[var(--color-border-primary)] text-[var(--textColor-primary)] hover:border-primary-300"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
