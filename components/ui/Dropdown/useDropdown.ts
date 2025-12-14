import { useState, useRef, useEffect } from "react";

type UseDropdownParams = {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (selected: string) => void;
  defaultOpen?: boolean;
};

export function useDropdown({ options, placeholder, value, onChange, defaultOpen = false }: UseDropdownParams) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selected, setSelected] = useState<string | undefined>(value ?? (placeholder ? undefined : options[0]));
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const selectOption = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return { isOpen, selected, dropdownRef, toggleOpen, selectOption };
}
