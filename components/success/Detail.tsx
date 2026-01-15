type DetailProps = {
  label: string;
  value: string;
};
export default function Detail({ label, value }: DetailProps) {
  return (
    <>
      <span className="textL font-medium">{label}</span>
      <span className="textM font-medium text-[var(--textColor-secondary)]">{value}</span>
      <hr className="text-[var(--color-border-secondary)]" />
    </>
  );
}
