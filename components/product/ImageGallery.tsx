import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

type ImageGalleryProps = {
  images: string[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-col w-[420px] gap-y-8">
      <div className="flex justify-center p-3 border border-[var(--color-border-secondary)]  bg-[var(--color-tile)] rounded-md h-[340px] ">
        <div className="relative flex justify-center w-full h-full overflow-hidden rounded-md bg-[var(--color-border-primary)]">
          <Image
            className="object-contain"
            src={images[selected]}
            alt={`Zdjęcie produktu ${selected + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>
      </div>
      <div className="flex gap-x-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(idx)}
            className={clsx(
              "relative flex justify-center w-32 h-24 rounded-md overflow-hidden border-2 cursor-pointer bg-[var(--color-border-primary)]",
              selected === idx ? "border-orange-400" : "border-transparent hover:border-gray-300"
            )}
          >
            <Image src={img} alt={`Miniatura ${idx + 1}`} fill sizes="128px" className="object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
