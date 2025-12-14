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
  initial = ["All"],
  options,
}: BrandDropdownClientProps) {
  const [selected, setSelected] = useState<string[]>(initial);
  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  const handleToggle = (option: string) => {
    setSelected((prev) => {
      if (option === "All") {
        if (prev.includes("All")) {
          return [];
        }
        return [...options];
      }

      const nonAllOptions = options.filter((o) => o !== "All");
      let newSelected: string[];

      if (prev.includes("All")) {
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
    <DropdownComponents withTitle title="Brand" limit={limit} defaultOpen>
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
