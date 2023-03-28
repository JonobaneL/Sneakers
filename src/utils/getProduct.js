import {shoes} from '../data/shoes'
export const getProductById = (id)=>{
    const product = shoes.find(item=>item.id===id)
    return product
}
export const getColorById = (product,id)=>{
    const color = product.colors.find(item=>item.id==id)
    return color
}