"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { DropDownIcon } from "./icons";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pages = pathname.split("/").filter(Boolean);

  return (
    <div className="flex gap-x-2 w-full max-w-[1440px] px-10 items-center">
      {pages.length > 0 && (
        <>
          <span className="text-[var(--textColor-tertiary)] textM font-medium capitalize">Home</span>
          <DropDownIcon className="-rotate-90 text-xs text-[var(--textColor-tertiary)]" />
        </>
      )}

      {pages.map((element, index) => {
        const isLast = index === pages.length - 1;
        const label = decodeURIComponent(element);

        return (
          <span
            key={`${element}-${index}`}
            className={clsx(
              isLast ? "text-[var(--textColor-primary)]" : "text-[var(--textColor-tertiary)]",
              "flex gap-x-2 items-center capitalize textM font-medium"
            )}
            {...(isLast && { "aria-current": "page" })}
          >
            {label}
            {!isLast && <DropDownIcon className="-rotate-90 text-xs text-[var(--textColor-tertiary)]" />}
          </span>
        );
      })}
    </div>
  );
}