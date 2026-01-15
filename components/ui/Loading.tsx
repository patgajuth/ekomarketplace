type LoadingProps = {
  text: string;
};

export default function Loading({ text }: LoadingProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center text-lg text-[var(--textColor-primary)] w-full">
      <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      <span>{text}</span>
    </div>
  );
}
