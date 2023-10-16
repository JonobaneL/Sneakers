import { useCallback, useEffect, useState } from "react";
import { useGenerateQuery } from "./useGenerateQuery";
import {
  expGetModels,
  expGetProducts,
  getProductModels,
} from "../firebase/productFirebaseAPI";
export const useProducts = (type, male, productsFilter, modelsFilter) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);

  const productsTriger = Object.keys(productsFilter).length;
  const modelsTriger = Object.keys(modelsFilter).length;

  const getEvent = useCallback(() => {
    setIsLoading(true);
    setError(undefined);
    setProducts([]);
    const productsQuery = useGenerateQuery("products", productsFilter);
    const modelsQuery = useGenerateQuery("products_models", modelsFilter);
    expGetProducts(type, male, productsQuery)
      .then((productsResponse) => {
        const tempProducts = [];
        productsResponse.forEach((item) =>
          tempProducts.push({ id: item.id, ...item.data() })
        );
        console.log("temp products", tempProducts);
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
              console.log("temp models", tempModels);
              setProducts((p) => [...tempModels, ...p]);
            })
            .catch((err) => {
              console.log(err);
              setError(err);
            })
            .finally(() => {});
        });
      })

      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [type, male, productsFilter, modelsFilter]);

  useEffect(() => {
    console.log("effect useProduct");
    getEvent();
  }, [getEvent]);

  return [products, isLoading, error];
};
