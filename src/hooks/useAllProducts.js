import { useCallback, useEffect, useState } from "react";
import { getAllProductsModels, getProduct } from "../productFirebaseAPI";


const useAllProducts = (type,male) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const [products,setProducts] = useState([])
    const callbackMemorized = useCallback(()=>{
        setIsLoading(true);
        setError(undefined)
        setProducts([])
        getAllProductsModels(type,male)
        .then(models_response=>{
           models_response.forEach(modelItem=>{
            const tempModel = modelItem.data();
            getProduct(tempModel.productID)
            .then(product_response=>{
                const tempProduct = product_response.data()
                setProducts(p=>[...p,{modelID:modelItem.id,...tempModel,...tempProduct}])
            })
            .catch(error=>setError(error))
           })

        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[type,male])
    useEffect(()=>{
        callbackMemorized()
    },[callbackMemorized])
    return [isLoading,error,products]
};


export default useAllProducts;