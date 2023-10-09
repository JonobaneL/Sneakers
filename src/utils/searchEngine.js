import { getCategories } from "../firebase/productFirebaseAPI";
import useAllProducts from "../hooks/useAllProducts";
import { useAsync } from "../hooks/useAsync";
import { useSearch } from "../hooks/useSearch";

export const searchEngine = (query) => {
  const [, , categories] = useAsync(getCategories, [], "firebase");
  const [, , products] = useAllProducts("all", "all");
  const categoriesResult = useSearch(categories, query, "name");
  const productsResult = useSearch(products, query, "name");

  return [productsResult, categoriesResult];
};
