"use client";

import Checkbox from "@/components/ui/Checkbox";
import DropdownComponents from "@/components/ui/DropdownComponents/DropdownComponents";
import { useEffect, useState } from "react";

type BrandDropdownClientProps = {
  limit?: number;
  onChange?: (data: string[]) => void;
  initial?: string[];
  options: string[];
};

export default function BrandDropdown({
  limit = 3,
  onChange,
  initial = ["Wszystkie"],
  options,
}: BrandDropdownClientProps) {
  const [selected, setSelected] = useState<string[]>(initial);
  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  const handleToggle = (option: string) => {
    setSelected((prev) => {
      if (option === "Wszystkie") {
        if (prev.includes("Wszystkie")) {
          return [];
        }
        return [...options];
      }

      const nonAllOptions = options.filter((o) => o !== "Wszystkie");
      let newSelected: string[];

      if (prev.includes("Wszystkie")) {
        const specificSelected = [...nonAllOptions];
        if (specificSelected.includes(option)) {
          newSelected = specificSelected.filter((o) => o !== option);
        } else {
          newSelected = [...specificSelected, option];
        }
      } else {
        if (prev.includes(option)) {
          newSelected = prev.filter((o) => o !== option);
        } else {
          newSelected = [...prev, option];
        }
      }

      if (newSelected.length === nonAllOptions.length) {
        return [...options];
      }

      return newSelected;
    });
  };

  return (
    <DropdownComponents withTitle title="Marki" limit={limit} defaultOpen>
      {options.map((option) => (
        <Checkbox
          key={option}
          sizeCheckbox="m"
          text={option}
          checked={selected.includes(option)}
          onChange={() => handleToggle(option)}
        />
      ))}
    </DropdownComponents>
  );
}
