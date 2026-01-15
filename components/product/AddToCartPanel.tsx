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
        <span className="textL font-medium text-[var(--textColor-tertiary)]">Suma częściowa</span>
        <span className="heading5 font-medium">{subtotal.toFixed(2)} zł</span>
      </div>
      <Button buttonStyle="stroke" withRightIcon rightIcon={<CartIcon />} onClick={onAdd}>
        Dodaj do koszyka
      </Button>
    </>
  );
}
