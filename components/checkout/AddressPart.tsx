export default function AddressPart({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex flex-col gap-y-2">
      <span className="textM font-medium text-[--textColor-secondary]">{label}</span>
      <span className="textM font-medium text-[--textColor-primary]">{text}</span>
    </div>
  );
}
