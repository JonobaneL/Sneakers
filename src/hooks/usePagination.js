import { useMemo } from "react";

export const usePagination = (total = 1) => {
  const pagesArray = useMemo(() => {
    return Array(total)
      .fill()
      .map((_, i) => i + 1);
  }, [total]);
  return pagesArray;
};
