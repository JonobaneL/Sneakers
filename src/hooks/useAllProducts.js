import { useCallback, useEffect, useState } from "react";
import { getAllProductsModels, getProduct } from "../firebase/productFirebaseAPI";


const useAllProducts = (type,male) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const [products,setProducts] = useState([])
    console.log(type,male)
    const callbackMemorized = useCallback(()=>{
        setIsLoading(true);
        setError(undefined)
        setProducts([])
        getAllProductsModels(type,male)
        .then(models_response=>{
            console.log(models_response.size)
            if(models_response.size === 0){
                console.log(err)
                throw new Error("don't find any data");
            }
            models_response.forEach(modelItem=>{
            const tempModel = modelItem.data();
            getProduct(tempModel.productID)
            .then(product_response=>{
                const tempProduct = product_response.data()
                setProducts(p=>[...p,{modelID:modelItem.id,...tempModel,...tempProduct}])
            })
            .catch(err=>{
                setError(err) 
                setIsLoading(false)
            })
           })

        })
        .catch(err=>{
            setError(err) 
            setIsLoading(false)
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