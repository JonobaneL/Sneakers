import { firebaseDB } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  orderBy,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

const categoriesRef = collection(firebaseDB, "categories");
const brandsRef = collection(firebaseDB, "brands");
const brandsQuery = query(brandsRef, orderBy("name", "asc"));
const categoriesQueary = query(categoriesRef, orderBy("name", "asc"));

export const getCategories = (type, male) => {
  if (type && !male) {
    const modifiedQuery = query(categoriesQueary, where("type", "==", type));
    return getDocs(modifiedQuery);
  } else if (type && male) {
    const modifiedQuery = query(
      categoriesQueary,
      where("type", "==", type),
      where("male", "in", [male, "all"])
    );
    return getDocs(modifiedQuery);
  } else {
    return getDocs(categoriesQueary);
  }
};

export const getBrands = (male) => {
  if (male) {
    const modifiedQuery = query(
      brandsQuery,
      where("male", "in", [male, "all"])
    );
    return getDocs(modifiedQuery);
  }
  return getDocs(brandsQuery);
};
export const getMaterials = (male) => {
  const materialsQuery = query(
    collection(firebaseDB, "materials"),
    where("male", "in", [male, "all"])
  );
  return getDocs(materialsQuery);
};
export const getSizeList = () => {
  const sizeListRef = query(
    collection(firebaseDB, "sizes"),
    orderBy("size", "asc")
  );
  return getDocs(sizeListRef);
};
export const getColors = () => {
  const colorsRef = collection(firebaseDB, "colors");
  return getDocs(colorsRef);
};

export const getProduct = (id) => {
  const productRef = doc(firebaseDB, "products", id);
  return getDoc(productRef);
};

export const getProductModel = (id) => {
  const productRef = doc(firebaseDB, "products_models", id);
  return getDoc(productRef);
};

export const getProductModels = (id) => {
  const productModelsRef = query(
    collection(firebaseDB, "products_models"),
    where("productID", "==", id)
  );
  return getDocs(productModelsRef);
};

export const getAllProductsModels = (
  //check purpouse of this code
  type,
  male,
  filter = collection(firebaseDB, "products_models")
) => {
  if (type === "all" && male === "all") {
    return getDocs(query(filter));
  }

  if (male) {
    return getDocs(
      query(filter, where("type", "==", type), where("male", "==", male))
    );
  }
  return getDocs(query(filter, where("type", "==", type)));
};

export const updateProductAmount = (modelID, sizes, available_sizes) => {
  const productRef = doc(firebaseDB, "products_models", modelID);
  return updateDoc(productRef, {
    sizes: sizes,
    available_sizes: available_sizes,
  });
};

export const expGetProducts = (type, male, filter) => {
  if (type === "all" && male === "all") {
    return getDocs(query(filter));
  }

  if (male == "all" || !male) {
    return getDocs(query(filter, where("type", "==", type)));
  }

  return getDocs(
    query(filter, where("type", "==", type), where("male", "==", male))
  );
};
export const expGetModels = (
  productID,
  filter = collection(firebaseDB, "products_models")
) => {
  const modelsRef = query(filter, where("productID", "==", productID));
  return getDocs(modelsRef);
};
//no need for this code

export const expGetModels2 = (type, male, filter) => {
  if (type === "all" && male === "all") {
    return getDocs(query(filter));
  }

  if (male == "all" || !male) {
    return getDocs(query(filter, where("type", "==", type)));
  }

  return getDocs(
    query(filter, where("type", "==", type), where("male", "==", male))
  );
};
expGetModels2;
