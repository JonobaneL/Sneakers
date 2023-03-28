import {shoes} from '../data/shoes'
export const getProductById = (id)=>{
    const product = shoes.find(item=>item.id===id)
    return product
}