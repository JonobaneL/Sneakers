import { getCategories } from "../firebase/productFirebaseAPI"
import { useAsync } from "../hooks/useAsync"
import { useSearch } from "../hooks/useSearch";

export const searchEngine = (query='work')=>{
    const [,,categories] = useAsync(getCategories,[],'firebase');
    const searchResult = useSearch(categories,query,'name')
    return searchResult;
}