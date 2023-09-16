import { useCallback, useEffect, useState } from "react"
import { useGenerateQuery } from "./useGenerateQuery"
import { expGetModels, expGetProducts, getAllProductsModels, getProductModels } from "../firebase/productFirebaseAPI"

export const useProducts = (type,male,productsFilter,modelsFilter)=>{
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const [products,setProducts] = useState([])

    const productsQuery = useGenerateQuery('products',productsFilter);
    const modelsQuery = useGenerateQuery('products_models',{});

    const getEvent = useCallback(()=>{
        setIsLoading(true);
        setError(undefined)
        setProducts([])

        expGetProducts(type,male,productsQuery)
        .then(productsResponse=>{
            const tempProducts = [];
            productsResponse.forEach(item=>tempProducts.push({id:item.id,...item.data()}))
            return tempProducts;
        })
        .then(productsResponse=>{
            console.log(productsResponse)
            productsResponse.forEach(product=>{
                console.log(product.id)
                expGetModels(product.id,modelsQuery)
                .then(modelsRespone=>{
                    modelsRespone.forEach(item=>{
                        console.log(item.id)
                        setProducts(p=>[...p,{modelID:item.id,...item.data(),...product}])
                    })
                })
                .catch(err=>{
                    console.log(err)
                    setError(err)
                })
            })
        })
        .catch(err=>{
            setError(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[])
    useEffect(()=>{
        getEvent()
    },[getEvent])
    return [products,isLoading,error]
}