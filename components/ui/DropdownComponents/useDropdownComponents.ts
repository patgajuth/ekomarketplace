import { useState } from "react";

type UseDropdownParams = {
  defaultOpen?: boolean;
  limit?: number;
};

export function useDropdownComponents({ defaultOpen = false, limit = 3 }: UseDropdownParams) {
  const [isOpen, setOpen] = useState(defaultOpen);
  const [isLoadMore, setLoadMore] = useState(false);

  const toggle = () => {
    setOpen(prev => !prev);
    setLoadMore(false);
  };
  const toggleLoadMore = () => {
    setLoadMore(prev => !prev);
  };


  return {
    isOpen,
    isLoadMore,
    toggle,
    toggleLoadMore,
    limit,
  };
}
