import { useEffect, useState } from "react";
import { getProduct, getProductModels } from "../firebase/productFirebaseAPI";
import { getFinalPrice } from "../utils/getFinalPrice";
import { useAsync } from "./useAsync";
export const useProduct = (id, modelId) => {
  const [isProductLoading, , product] = useAsync(
    () => getProduct(id),
    [],
    "firebase"
  );

  const [isProductModelsLoading, , productModels] = useAsync(
    () => getProductModels(id),
    [],
    "firebase"
  );
  const currentModel = productModels?.find((item) => item.id === modelId) || {};

  return {
    id: product?.id,
    name: product?.name,
    brand: product?.brand,
    price: product?.price,
    descripion: product?.description,
    models: productModels || [],
    currentModelName: currentModel?.model_name,
    images: currentModel?.images || [],
    rate: currentModel?.rate,
    sizes: currentModel?.sizes || [],
    discount: currentModel?.discount,
    type: product?.type,
    male: product?.male,
    cost: parseFloat(getFinalPrice(product?.price, currentModel?.discount)),
    isLoading: isProductModelsLoading,
  };
};
