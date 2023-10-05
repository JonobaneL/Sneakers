import { useCallback, useEffect, useState } from "react";
import { useGenerateQuery } from "./useGenerateQuery";
import {
  expGetModels,
  expGetProducts,
  getAllProductsModels,
  getProductModels,
} from "../firebase/productFirebaseAPI";
import { onSnapshot } from "firebase/firestore";
export const useProducts = (type, male, productsFilter, modelsFilter) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);

  // const productsQuery = useGenerateQuery("products", productsFilter);
  // const modelsQuery = useGenerateQuery("products_models", modelsFilter);
  const productsTriger = Object.keys(productsFilter).length;
  const modelsTriger = Object.keys(modelsFilter).length;
  console.log(productsFilter);
  console.log("products", products);
  const getEvent = useCallback(() => {
    const productsQuery = useGenerateQuery("products", productsFilter);
    const modelsQuery = useGenerateQuery("products_models", modelsFilter);
    setIsLoading(true);
    setError(undefined);
    setProducts([]);
    expGetProducts(type, male, productsQuery)
      .then((productsResponse) => {
        const tempProducts = [];
        productsResponse.forEach((item) =>
          tempProducts.push({ id: item.id, ...item.data() })
        );
        return tempProducts;
      })
      .then((productsResponse) => {
        console.log("product response", productsResponse);

        productsResponse.forEach((product) => {
          expGetModels(product.id, modelsQuery)
            .then((modelsRespone) => {
              const tempModels = [];
              modelsRespone.forEach((item) => {
                tempModels.push({
                  modelID: item.id,
                  ...item.data(),
                  ...product,
                });
              });
              console.log("temp model product", tempModels);
              setProducts((p) => [...tempModels, ...p]);
            })
            .catch((err) => {
              console.log(err);
              setError(err);
            });
        });
      })

      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [type, male, productsTriger, modelsTriger]);

  useEffect(() => {
    console.log("effect useProduct");
    getEvent();
  }, [getEvent, productsTriger, modelsTriger]);

  return [products, isLoading, error];
};
// console.log("model response", item.id);
// setProducts((p) => [
//   ...p,
//   { modelID: item.id, ...item.data(), ...product },
// ]);
