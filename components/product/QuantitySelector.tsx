import Counter from "@/components/ui/Counter";

type QuantitySelectorProps = {
  stock: number;
  value: number;
  onChange: (n: number) => void;
};

export default function QuantitySelector({ stock, value, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex flex-col gap-y-3.5">
      <span className="textL font-medium text-[var(--textColor-tertiary)]">Quantity</span>
      <div className="flex gap-x-4 items-center">
        <Counter max={stock} value={value} onChange={onChange} />
        <span className="textM font-medium">Stock: {stock}</span>
      </div>
    </div>
  );
}
