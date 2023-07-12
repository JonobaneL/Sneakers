import {shoes} from '../data/shoes'
import { getProduct } from '../firedbAPI';
import { getFinalPrice } from '../utils/getFinalPrice';
import { useAsync } from './useAsync';
export const useProduct =(id,modelId)=>{
    const response = shoes.find(item=>item.id === id);
    const colorResponse = response.colors.find(item=>item.id === parseInt(modelId,10));
    const [isProductLoading,,product] = useAsync(()=>getProduct(id),[],'firebase')
    const [isProductDetailsLoading,,productDetails] = useAsync(()=>getProductModel(id),[],'firebase')

    // const productResp
    return {
        id:product.id,
        name:product.name,
        brand:product.brand,
        price:product.price,
        descripion:product.descripion,
        colorName:productDetails.name,
        colors:product.models,
        images:colorResponse.images,
        rate:colorResponse.rate,
        nAvailable: colorResponse.nAvailable,
        discount:colorResponse.discount,
        cost:parseFloat(getFinalPrice(response.price,colorResponse.discount))
    }
}