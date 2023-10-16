import { useCallback, useEffect, useState } from "react";
import {
  getAllProductsModels,
  getProduct,
} from "../firebase/productFirebaseAPI";

const useAllProducts = (type, male, productsFilter, modelsFilter) => {
  //під питтанням
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [products, setProducts] = useState([]);
  const callbackMemorized = useCallback(() => {
    setIsLoading(true);
    setError(undefined);
    setProducts([]);

    getAllProductsModels(type, male)
      .then((models_response) => {
        if (models_response.size === 0) {
          throw new Error("don't find any data");
        }
        const models = [];
        models_response.forEach((model) =>
          models.push({ id: model.id, ...model.data() })
        );
        return models;
      })
      .then((models) => {
        models.map((model) => {
          getProduct(model.productID)
            .then((product_response) => {
              const tempProduct = product_response.data();
              setProducts((p) => [
                ...p,
                { modelID: model.id, ...model, ...tempProduct },
              ]);
            })
            .catch(setError);
        });
      })
      .catch(setError)
      .finally(() => {
        setIsLoading(false);
      });
  }, [type, male]);
  useEffect(() => {
    callbackMemorized();
  }, [callbackMemorized]);
  return [isLoading, error, products];
};

export default useAllProducts;
