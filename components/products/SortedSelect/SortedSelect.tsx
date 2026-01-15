"use client";

import React from "react";
import { useSortedSelect } from "./useSortedSelect";
import Dropdown from "@/components/ui/Dropdown/Dropdown";

type SortedSelectProps = {
  onChange: (data: { sortBy: string; itemsPerPage: string }) => void;
};

export default function SortedSelect({ onChange }: SortedSelectProps) {
  const {
    sortByLabels,
    itemsPerPageLabels,
    selectSortBy,
    selectItemsPerPage,
      } = useSortedSelect({ onChange });

  return (
    <div className="flex gap-x-15">
      <div className="flex items-center gap-x-4">
        <span className="heading7 font-semibold">Sortuj</span>
        <Dropdown
          onChange={selectSortBy}
          sizeDropdown="s"
          options={sortByLabels}
          className="w-[170px]"
        />
      </div>
      <div className="flex items-center gap-x-4">
        <span className="heading7 font-semibold">Pokaż</span>
        <Dropdown
          onChange={selectItemsPerPage}
          sizeDropdown="s"
          options={itemsPerPageLabels}
          className="w-[100px]"
        />
      </div>
    </div>
  );
}
