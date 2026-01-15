"use client";
import React from "react";
import clsx from "clsx";
import { usePaginationLogic } from "./usePaginationLogic";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = usePaginationLogic(currentPage, totalPages);

  return (
    <div className="flex gap-x-2">
      {pages.map((element, index) =>
        element !== "..." ? (
          <button
            key={`page-${element}-${index}`}
            onClick={() => onPageChange(Number(element))}
            className={clsx(
              element === currentPage
                ? "bg-[var(--color-primary)] text-[var(--background)]"
                : "text-[var(--textColor-tertiary)]",
              "textM w-11 h-11 rounded-md cursor-pointer"
            )}
          >
            {element}
          </button>
        ) : (
          <div
            key={`ellipsis-${index}`}
            className="flex textM items-center justify-center w-11 h-11"
          >
            ...
          </div>
        )
      )}
    </div>
  );
}
