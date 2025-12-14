"use client";

import React, { useState, useRef, useLayoutEffect, useCallback, useId } from "react";
import clsx from "clsx";
import { RightArrowIcon } from "../icons";

type TileContainerProps = {
  children: React.ReactNode;
  title: string;
};

const TileContainer: React.FC<TileContainerProps> = ({ children, title }) => {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentId = useId();

  const checkOverflow = useCallback(() => {
    const el = wrapperRef.current;
    if (el && !expanded) {
      setHasOverflow(el.scrollWidth > el.clientWidth);
    }
  }, [expanded]);

  useLayoutEffect(() => {
    checkOverflow();
    const el = wrapperRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);
    window.addEventListener("resize", checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [children, checkOverflow]);

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const headerClasses = clsx("mb-8", hasOverflow && "flex justify-between items-center");

  const wrapperClasses = clsx(
    "flex gap-x-[32px]",
    hasOverflow
      ? expanded
        ? "flex-wrap gap-y-[32px] justify-evenly"
        : "w-max max-w-[1350px] overflow-x-auto scroll-smooth justify-evenly pb-2"
      : "justify-between"
  );

  return (
    <section className="max-w-[1440px]">
      <header className={headerClasses}>
        <h2 className="heading4 font-medium">{title}</h2>
        {hasOverflow && (
          <button
            onClick={handleToggle}
            aria-expanded={expanded}
            aria-controls={contentId}
            className="flex items-center gap-x-3 textM font-medium text-[var(--color-primary)] cursor-pointer"
          >
            {expanded ? "See Less" : "See All"}
            <RightArrowIcon className={clsx("transition-transform duration-300", expanded && "rotate-180")} />
          </button>
        )}
      </header>

      <div id={contentId} ref={wrapperRef} className={clsx(wrapperClasses, "p-1")}>
        {children}
      </div>
    </section>
  );
};

export default React.memo(TileContainer);
