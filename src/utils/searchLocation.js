import { useMemo } from "react";
import { city } from "../data/shipping-data";
export const findLocation = (query) => {
  const searchedLocations = useMemo(() => {
    return city.filter((e) =>
      e.name.toLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [city, query]);
  return searchedLocations;
};
