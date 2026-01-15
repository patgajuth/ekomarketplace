import Image from "next/image";

function PaymentLogo({ imgSrc, alt }: { imgSrc: string; alt: string }) {
  return (
    <div className="bg-base-white border border-[var(--color-border-primary)] w-12 rounded-md p-1.5 flex items-center justify-center">
      <Image src={imgSrc} alt={alt} width={40} height={24} className="h-full w-full object-contain" />
    </div>
  );
}

export default PaymentLogo;
