"use client";

import Checkbox from "@/components/ui/Checkbox";
import DropdownComponents from "@/components/ui/DropdownComponents/DropdownComponents";
import { useEffect, useState } from "react";

type CategoryDropdownClientProps = {
  limit?: number;
  onChange?: (data: string[]) => void;
  initial?: string[];
  options: string[];
};

export default function CategoryDropdown({
  limit = 3,
  onChange,
  initial = ["All"],
  options,
}: CategoryDropdownClientProps) {
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

      const nonAll = options.filter((o) => o !== "All");
      let next: string[];

      if (prev.includes("All")) {
        const specifics = [...nonAll];
        if (specifics.includes(option)) {
          next = specifics.filter((o) => o !== option);
        } else {
          next = [...specifics, option];
        }
      } else {
        if (prev.includes(option)) {
          next = prev.filter((o) => o !== option);
        } else {
          next = [...prev, option];
        }
      }

      if (next.length === nonAll.length) {
        return [...options];
      }
      return next;
    });
  };

  return (
    <DropdownComponents withTitle title="Category" limit={limit} defaultOpen>
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
