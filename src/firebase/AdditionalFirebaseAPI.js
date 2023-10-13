import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDB } from "./firebase";

export const getTopBrands = () => {
  const brandsRef = collection(firebaseDB, "top_brands");
  return getDocs(brandsRef);
};
export const expQuery = () => {
  const productsQuery = query(
    collection(firebaseDB, "products"),
    where("brand", "in", ["Converse"]),
    where("male", "==", "men"),
    where("type", "==", "shoes")
  );
  return getDocs(productsQuery);
};
