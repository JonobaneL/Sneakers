import { collection, query, where } from "firebase/firestore";
import { firebaseDB } from "../firebase/firebase";

const priceFilter = (filters, collectionName) => {
  let productsRef = collection(firebaseDB, collectionName);
  filters.forEach((filter) => {
    switch (filter) {
      case "Under $30":
        console.log("$30 to $50");
        productsRef = query(productsRef, where("price", "<=", 30));
      case "$30 to $50":
        console.log("$30 to $50");
        productsRef = query(
          productsRef,
          where("price", ">=", 30),
          where("price", "<=", 50)
        );
        break;
      case "$50 to $75":
        console.log("$50 to $75");
        productsRef = query(
          productsRef,
          where("price", ">=", 50),
          where("price", "<=", 75)
        );
        break;
      case "$75+":
        console.log("$75+");
        productsRef = query(productsRef, where("price", ">=", 75));
        break;
    }
  });

  return productsRef;
};

export const useGenerateQuery = (collectionName, filters) => {
  let productsRef = collection(firebaseDB, collectionName);
  console.log(filters);
  if (!filters) return productsRef;

  Object.keys(filters).forEach((key) => {
    console.log("key =", key);
    if (Array.isArray(filters[key])) {
      if (filters[key].length >= 1) {
        productsRef = query(productsRef, where(key, "in", filters[key]));
      }
    } else {
      if (filters[key].length > 0) {
        productsRef = query(productsRef, where(key, "==", filters[key]));
      }
    }
  });
  return productsRef;
};
