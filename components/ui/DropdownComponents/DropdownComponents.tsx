import React from "react";
import clsx from "clsx";
import { CrossIcon, DropDownIcon, MinusIcon } from "../../icons";
import { useDropdownComponents } from "./useDropdownComponents";

type DropdownComponentsProps = {
  children: React.ReactNode;
  withTitle?: boolean;
  title?: string;
  limit?: number;
  defaultOpen?: boolean;
};

export default function DropdownComponents({
  children,
  withTitle,
  title = "Details",
  limit = 3,
  defaultOpen,
}: DropdownComponentsProps) {
  const { isOpen, isLoadMore, toggle, toggleLoadMore } = useDropdownComponents({ defaultOpen, limit });
  const items = React.Children.toArray(children);
  const visible = isLoadMore ? items : items.slice(0, limit);

  return (
    <div className="p-4">
      <div onClick={toggle} className="flex justify-between items-center cursor-pointer select-none">
        {withTitle && <span className="heading7 font-semibold">{title}</span>}
        <DropDownIcon className={clsx("transition-transform duration-300", isOpen && "rotate-180")} />
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col gap-2">
          {visible}

          {items.length > limit && (
            <button onClick={toggleLoadMore} className="mt-4 cursor-pointer textM">
              {isLoadMore ? (
                <span className="flex gap-x-3.5 items-center">
                  Load Less <MinusIcon />
                </span>
              ) : (
                <span className="flex gap-x-3.5 items-center">
                  Load More <CrossIcon />
                </span>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
