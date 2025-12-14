"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import CarouselSlide from "./CarouselSlide";
import CarouselControls from "./CarouselControls";
import CarouselDots from "./CarouselDots";
import { Category } from "@prisma/client";

const TRANSITION_DURATION = 500;

type CarouselProps = { categories: Category[] };

export default function Carousel({ categories }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [stage, setStage] = useState<"idle" | "animatingOut" | "animatingIn">("idle");
  const [animationDirection, setAnimationDirection] = useState<1 | -1>(1);
  const router = useRouter();

  const startTransition = useCallback(
    (newIndex: number, animationDirection: 1 | -1) => {
      if (stage !== "idle") return;
      setAnimationDirection(animationDirection);
      setTargetIndex(newIndex);
      setStage("animatingOut");
    },
    [stage]
  );

  const handlePrev = useCallback(() => {
    const newIdx = activeIndex === 0 ? categories.length - 1 : activeIndex - 1;
    startTransition(newIdx, -1);
  }, [activeIndex, categories.length, startTransition]);

  const handleNext = useCallback(() => {
    const newIdx = activeIndex === categories.length - 1 ? 0 : activeIndex + 1;
    startTransition(newIdx, 1);
  }, [activeIndex, categories.length, startTransition]);

  const handleDotSelect = useCallback(
    (idx: number) => {
      if (idx === activeIndex) return;
      const dir = idx > activeIndex ? 1 : -1;
      startTransition(idx, dir);
    },
    [activeIndex, startTransition]
  );

  const handleClick = useCallback(
    (name: string) => {
      router.push(`/products?category=${encodeURIComponent(name)}`);
    },
    [router]
  );

  useEffect(() => {
    if (stage !== "animatingOut") return;
    const timeout = setTimeout(() => {
      setActiveIndex(targetIndex!);
      setStage("animatingIn");
    }, TRANSITION_DURATION);
    return () => clearTimeout(timeout);
  }, [stage, targetIndex]);

  useEffect(() => {
    if (stage !== "animatingIn") return;
    const timeout = setTimeout(() => {
      setStage("idle");
      setTargetIndex(null);
    }, TRANSITION_DURATION);
    return () => clearTimeout(timeout);
  }, [stage]);

  return (
    <div className="flex flex-col gap-y-6 items-center">
      <div className="relative w-full h-[452px] overflow-hidden bg-[var(--color-tile)] border border-[var(--color-border-primary)] rounded-md">
        {stage === "idle" && (
          <div className="absolute inset-0">
            <CarouselSlide
              category={categories[activeIndex]}
              onButtonClick={() => handleClick(categories[activeIndex].name)}
            />
          </div>
        )}
        {animationDirection === 1 ? (
          <>
            {stage === "animatingOut" && (
              <div className="absolute inset-0 animate-slide-out-right">
                <CarouselSlide
                  category={categories[activeIndex]}
                  onButtonClick={() => handleClick(categories[activeIndex].name)}
                />
              </div>
            )}

            {stage === "animatingIn" && (
              <div className="absolute inset-0 animate-slide-in-left">
                <CarouselSlide
                  category={categories[targetIndex!]}
                  onButtonClick={() => handleClick(categories[targetIndex!].name)}
                />
              </div>
            )}
          </>
        ) : (
          <>
            {stage === "animatingOut" && (
              <div className="absolute inset-0 animate-slide-out-left">
                <CarouselSlide
                  category={categories[activeIndex]}
                  onButtonClick={() => handleClick(categories[activeIndex].name)}
                />
              </div>
            )}

            {stage === "animatingIn" && (
              <div className="absolute inset-0 animate-slide-in-right">
                <CarouselSlide
                  category={categories[targetIndex!]}
                  onButtonClick={() => handleClick(categories[targetIndex!].name)}
                />
              </div>
            )}
          </>
        )}

        <CarouselControls onPrev={handlePrev} onNext={handleNext} />
      </div>
      <CarouselDots count={categories.length} activeIndex={activeIndex} onSelect={handleDotSelect} />
    </div>
  );
}
