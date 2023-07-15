import { createSlice, isAnyOf } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        shoppingCart:[],
        cartQuantity:0,
        cartSubTotal:0,
        cartDiscount:0,
        cartTotal:0,
    },
    reducers:{
        addToCart(state,action) {
            state.shoppingCart.push({...action.payload,quantity:3})
        },
        removeFromCart(state,action){
            const product = {...action.payload}
            state.shoppingCart = state.shoppingCart.filter(item=>item.productID!==product.productID && item.modelID!==product.modelID && item.size!==product.size)
        },
        increaseCartQuantity(state,action){
            const product = {...action.payload}
            state.shoppingCart = state.shoppingCart.map(item=>{
                if(item.productID===product.productID && item.modelID===product.modelID && item.size===product.size){
                    return {...item,quantity: item.quantity+1}
                }else{
                    return item
                }
            })
        },
        decreaseCartQuantity(state,action){
            const product = {...action.payload}
            const productResponse = state.shoppingCart.find(item=>item.productID===product.productID && item.modelID===product.modelID && item.size===product.size);
            if(productResponse?.quantity===1){
                state.shoppingCart = state.shoppingCart.filter(item=>item.productID!==product.productID && item.modelID!==product.modelID && item.size!==product.size)
            }else{
                state.shoppingCart = state.shoppingCart.map(item=>{
                    if(item.productID===product.productID && item.modelID===product.modelID && item.size===product.size){
                        return {...item,quantity: item.quantity-1}
                    }else{
                        return item
                    }
                })
            }
            
        }  
    },
    extraReducers:(builder)=>{
        builder
        .addMatcher(isAnyOf,(state)=>{
            state.cartQuantity = state.shoppingCart.reduce((quantity,item)=>item.quantity+quantity,0)
            state.cartSubTotal = state.shoppingCart.reduce((subTotal,item)=>item.price+subTotal,0)
            state.cartTotal = state.shoppingCart.reduce((total,item)=>item.cost+total,0)
        })
    }
})
export const {addToCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = cartSlice.actions
export default cartSlice.reducer;
