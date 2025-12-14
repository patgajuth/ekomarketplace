import { useState, useEffect } from "react";
import InputField from "../ui/InputField";
import { DropDownIcon } from "../icons";
import DropdownComponents from "../ui/DropdownComponents/DropdownComponents";

function PricingDropdown({ onChange }: { onChange?: (data: { minPrice: string; maxPrice: string }) => void }) {
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  useEffect(() => {
    onChange?.({ minPrice: min, maxPrice: max });
  }, [min, max, onChange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = parseFloat(value);
    if (value === "" || isNaN(num)) {
      setMin(value);
      return;
    }
    if (max !== "" && num > parseFloat(max)) {
      setMin(max);
    } else {
      setMin(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = parseFloat(value);
    if (value === "" || isNaN(num)) {
      setMax(value);
      return;
    }
    if (min !== "" && num < parseFloat(min)) {
      setMax(min);
    } else {
      setMax(value);
    }
  };

  return (
    <DropdownComponents withTitle title="Price" defaultOpen>
      <InputField
        variant="leftButton"
        placeholder="$ Min Price"
        textButton="USD"
        value={min}
        onChange={handleMinChange}
        withRightIcon
        rightIcon={<DropDownIcon />}
        className="w-full"
      />
      <InputField
        variant="leftButton"
        placeholder="$ Max Price"
        textButton="USD"
        value={max}
        onChange={handleMaxChange}
        withRightIcon
        rightIcon={<DropDownIcon />}
        className="w-full"
      />
    </DropdownComponents>
  );
}

export default PricingDropdown;
