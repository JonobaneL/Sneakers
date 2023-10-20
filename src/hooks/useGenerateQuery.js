import { collection, query, where } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebase";

const priceQuery = (ref, filters, key) => {
  // let productsRef = { ...ref };
  console.log(ref);
  filters[key].forEach((filter) => {
    console.log("priceQuery = ", filter);
    switch (filter) {
      case "Under $30":
        console.log("$30 to $50");
        ref = query(ref, where("price", "<=", 30));
        break;
      case "$30 to $50":
        console.log("$30 to $50");
        ref = query(ref, where("price", ">=", 30), where("price", "<", 50));
        break;
      case "$50 to $75":
        console.log("$50 to $75");
        ref = query(ref, where("price", ">=", 50), where("price", "<", 75));
        break;
      case "$75+":
        console.log("$75+");
        ref = query(ref, where("price", ">=", 75));
        break;
    }
  });
  return ref;
};
const discountQuery = (ref, filters, key) => {};

const filtersGeneration = (ref, filters, key) => {
  if (!Array.isArray(filters[key])) {
    ref = query(ref, where(key, "==", filters[key]));
    return ref;
  }
  ref = query(ref, where(key, "in", filters[key]));
  return ref;
};
// const sizeQuery = (ref, filters, key) => {
//   ref = query(ref, where("available_sizes", "in", filters[key]));
//   return ref;
// };

const mainGeneration = (key) => {
  if (key === "price") return priceQuery;
  if (key === "discount") return discountQuery;
  // if (key === "size") return discountQuery;
  return filtersGeneration;
};

export const useGenerateQuery = (collectionName, filters) => {
  let productsRef = collection(firebaseDB, collectionName);
  console.log(filters);
  if (!filters) return productsRef;

  Object.keys(filters).forEach((key) => {
    console.log("key =", key);
    const generationMethod = mainGeneration(key);
    productsRef = generationMethod(productsRef, filters, key);
  });
  return productsRef;
};
