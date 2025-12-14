import Button from "@/components/ui/Button";
import { CartIcon } from "@/components/icons";

type AddToCartPanelProps = {
  subtotal: number;
  onAdd: () => void;
};

export default function AddToCartPanel({ subtotal, onAdd }: AddToCartPanelProps) {
  return (
    <>
      <div className="flex justify-between">
        <span className="textL font-medium text-[var(--textColor-tertiary)]">Subtotal</span>
        <span className="heading5 font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <Button buttonStyle="stroke" withRightIcon rightIcon={<CartIcon />} onClick={onAdd}>
        Add to Cart
      </Button>
    </>
  );
}