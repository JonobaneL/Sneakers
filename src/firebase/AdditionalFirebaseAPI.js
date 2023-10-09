import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "./firebase";

export const getTopBrands = () => {
  const brandsRef = collection(firebaseDB, "top_brands");
  return getDocs(brandsRef);
};
