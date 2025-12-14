type LineProps = {
  label: string;
  value: number;
};

export default function Line({ label, value }: LineProps) {
  return (
    <div className="flex justify-between">
      <span className="textM font-medium">{label}</span>
      <span className="textL font-medium">${value.toFixed(2)}</span>
    </div>
  );
}
