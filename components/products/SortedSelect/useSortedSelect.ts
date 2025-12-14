import { useState, useEffect } from "react";

type SortByOption = { value: string; label: string };

type UseSortedSelectParams = {
  onChange: (data: { sortBy: string; itemsPerPage: string }) => void;
  sortByOptions?: SortByOption[];
  itemsPerPageOptions?: string[];
  initialSortBy?: string;
  initialItemsPerPage?: string;
};

export function useSortedSelect({
  onChange,
  sortByOptions = [
    { value: "latest", label: "Latest" },
    { value: "highest_price", label: "Highest price" },
    { value: "lowest_price", label: "Lowest price" },
  ],
  itemsPerPageOptions = ["9", "12", "15"],
  initialSortBy,
  initialItemsPerPage,
}: UseSortedSelectParams) {
  const [sortBy, setSortBy] = useState<string>(
    initialSortBy ?? sortByOptions[0].value
  );
  const [itemsPerPage, setItemsPerPage] = useState<string>(
    initialItemsPerPage ?? itemsPerPageOptions[0]
  );

  useEffect(() => {
    onChange({ sortBy, itemsPerPage });
  }, [sortBy, itemsPerPage, onChange]);

  const selectSortBy = (label: string) => {
    const selected = sortByOptions.find((o) => o.label === label);
    if (selected) {
      setSortBy(selected.value);
    }
  };

  const selectItemsPerPage = (value: string) => {
    if (itemsPerPageOptions.includes(value)) {
      setItemsPerPage(value);
    }
  };

  const sortByLabels = sortByOptions.map((o) => o.label);
  const itemsPerPageLabels = itemsPerPageOptions;

  return {
    sortBy,
    itemsPerPage,
    sortByLabels,
    itemsPerPageLabels,
    selectSortBy,
    selectItemsPerPage,
  };
}
