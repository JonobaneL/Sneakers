import { updateProductAmount } from "../firebase/productFirebaseAPI"
import { useProduct } from "../hooks/useProduct"

export const decreaseAmount = async(product)=>{
    const productResponse = useProduct(product.productID,product.modelID)
    const currentSizes = productResponse.sizes.map(item=>{
        if(item.size === product.size){
           return {...item,amount:item.amount-product.quantity}
        }else return item
    })
    console.log(currentSizes,product.productID)
    try{
        await updateProductAmount(product.modelID,currentSizes)
    }
    catch(err){
        console.log(err)
    }
}

export const productsAmount = (products)=>{
    if(products.length===0) return
    products.map(item=>{
        decreaseAmount(item)
    })
}
//переробити цей функціонал
