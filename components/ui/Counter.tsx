import React, { useState, useEffect, useCallback } from "react";
import { CrossIcon, MinusIcon } from "@/components/icons";

type CounterProps = {
  max: number;
  onChange?: (value: number) => void;
  value?: number;
};

export default function Counter({ max, onChange, value = 1 }: CounterProps) {
  const [quantity, setQuantity] = useState(value);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  useEffect(() => {
    onChange?.(quantity);
  }, [quantity]);

  const increment = useCallback(() => {
    setQuantity((prev) => (prev < max ? prev + 1 : prev));
  }, [max]);

  const decrement = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1));
  }, []);

  return (
    <div className="flex items-center gap-x-3.5 border border-textColor-primary rounded-md py-3.5 px-6">
      <button onClick={decrement}>
        <MinusIcon />
      </button>
      <span className="w-6 text-center">{quantity}</span>
      <button onClick={increment}>
        <CrossIcon />
      </button>
    </div>
  );
}
