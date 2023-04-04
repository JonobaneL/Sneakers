import {shoes} from '../data/shoes'
import { getFinalPrice } from '../utils/getFinalPrice';
export const useShoes =(id,colorId)=>{
    const response = shoes.find(item=>item.id === id);
    const colorResponse = response.colors.find(item=>item.id === parseInt(colorId,10));
    return {
        id:response.id,
        name:response.name,
        brand:response.brand,
        price:response.price,
        descripion:response.descripion,
        colorName:colorResponse.title,
        colors:response.colors,
        images:colorResponse.images,
        rate:colorResponse.rate,
        nAvailable: colorResponse.nAvailable,
        discount:colorResponse.discount,
        cost:parseFloat(getFinalPrice(response.price,colorResponse.discount))
    }
}