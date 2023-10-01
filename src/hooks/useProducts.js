import { useCallback, useEffect, useState } from "react";
import { useGenerateQuery } from "./useGenerateQuery";
import {
  expGetModels,
  expGetProducts,
  getAllProductsModels,
  getProductModels,
} from "../firebase/productFirebaseAPI";

export const useProducts = (
  type,
  male,
  productsFilter = {},
  modelsFilter = {}
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);

  const productsQuery = useGenerateQuery("products", productsFilter);
  const modelsQuery = useGenerateQuery("products_models", modelsFilter);
  const productsTriger = Object.keys(productsFilter).length;
  console.log(productsTriger);
  const test = { name: "er", age: 23 };

  const modelsTriger = Object.keys(modelsFilter).length;
  const getEvent = useCallback(() => {
    setIsLoading(true);
    setError(undefined);
    setProducts([]);

    expGetProducts(type, male, productsQuery)
      .then((productsResponse) => {
        console.log("query");
        const tempProducts = [];
        productsResponse.forEach((item) =>
          tempProducts.push({ id: item.id, ...item.data() })
        );
        return tempProducts;
      })
      .then((productsResponse) => {
        productsResponse.forEach((product) => {
          expGetModels(product.id, modelsQuery)
            .then((modelsRespone) => {
              modelsRespone.forEach((item) => {
                setProducts((p) => [
                  ...p,
                  { modelID: item.id, ...item.data(), ...product },
                ]);
              });
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
        console.log("finalie");
        setIsLoading(false);
      });
  }, [type, male, productsTriger, modelsTriger]);
  useEffect(() => {
    console.log("effect useProduct");
    getEvent();
    console.log(products);
  }, [getEvent]);
  return [products, isLoading, error];
};
