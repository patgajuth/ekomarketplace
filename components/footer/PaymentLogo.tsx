function PaymentLogo({ imgSrc, alt }: { imgSrc: string; alt: string }) {
  return (
    <div className="bg-base-white border border-[var(--color-border-primary)] w-12 rounded-md p-1.5 flex items-center justify-center">
      <img src={imgSrc} alt={alt} className="h-full object-contain" />
    </div>
  );
}

export default PaymentLogo;
