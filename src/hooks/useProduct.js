import { getProduct, getProductModels } from '../firedbAPI';
import { getFinalPrice } from '../utils/getFinalPrice';
import { useAsync } from './useAsync';
export const useProduct =(id,modelId)=>{
    const [isProductLoading,,product] = useAsync(()=>getProduct(id),[],'firebase')
    const [isProductModelsLoading,,productModels] = useAsync(()=>getProductModels(id),[],'firebase')
    const currentModel = productModels.find(item=>item.id===modelId) || {}

    return {
        id:product.id,
        name:product.name,
        brand:product.brand,
        price:product.price,
        descripion:product.description,
        models:productModels ||[],
        currentModelName:currentModel.name,
        images:currentModel.images||[],
        rate:currentModel.rate,
        sizes:currentModel.sizes,
        discount:currentModel.discount,
        cost:parseFloat(getFinalPrice(product.price,currentModel.discount)),
        isLoading:isProductModelsLoading
    }
}