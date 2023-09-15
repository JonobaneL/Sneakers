import { getProductModel, updateProductAmount } from "../firebase/productFirebaseAPI"

export const decreaseProductsAmount = (products)=>{
    products.map(item=>{
        getProductModel(item.modelID)
        .then((data)=>{
            return data.data();
        })
        .then(product=>{
            const currentSizes = product.sizes.map(product_size=>{
                if(product_size.size === item.size){
                    return {...product_size,amount:product_size.amount-item.quantity}
                }else return product_size
            })
            return currentSizes;
        })
        .then(product_sizes=>{
            updateProductAmount(item.modelID,product_sizes)
            .catch(err=>console.log(err))
        })
    })
}
