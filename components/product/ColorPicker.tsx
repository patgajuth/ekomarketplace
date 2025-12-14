import clsx from "clsx";
import { CheckIcon } from "@/components/icons";
import { useState } from "react";

type Color = { name: string; className: string };

type ColorPickerProps = {
  colors: Color[];
  onSelect: (color: string) => void;
};

export default function ColorPicker({ colors, onSelect }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  const handleClick = (color: Color) => {
    setSelectedColor(color.name);
    onSelect(color.name);
  };

  return (
    <div className="flex flex-col gap-y-3.5">
      <span className="textL font-medium text-[var(--textColor-tertiary)]">Colors</span>
      <div className="flex gap-x-4">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => handleClick(color)}
            className={clsx(
              "w-13.5 h-13.5 rounded-md border flex items-center justify-center relative",
              color.className,
              selectedColor === color.name
                ? "border-[var(--color-border-primary)]"
                : "border-[var(--color-border-secondary)]"
            )}
          >
            {selectedColor === color.name && (
              <CheckIcon className="w-5 h-5 text-black drop-shadow-[0px_1px_0px_white] absolute" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}