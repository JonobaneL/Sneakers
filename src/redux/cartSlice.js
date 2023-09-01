import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { getCart, updateCart } from "../firebase/cartFirebaseAPI"
import { getFinalPrice } from "../utils/getFinalPrice"

export const fetchShoppingCart = createAsyncThunk(
    'cart/fetchShoppingCart',
    async (userID)=>{
        const response = await getCart(userID)
        let cart = {}
        response.forEach(item=>cart={...item.data(),cartID:item.id})
        return cart
    }
)
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product,{dispatch,rejectWithValue,getState})=>{
        dispatch(addToCartAction(product))
        const state = getState()
        try{
            await updateCart({cartID:state.cartReducer.cartID,cart:state.cartReducer.shoppingCart});
        }catch(err){
            console.log(err)
            rejectWithValue()
        }
    }
)
export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (product,{dispatch,rejectWithValue,getState})=>{
        dispatch(removeFromCartAction(product))
        const state = getState();
        try{
           await updateCart({cartID:state.cartReducer.cartID,cart:state.cartReducer.shoppingCart});
        }catch(err){
            console.log(err)
            rejectWithValue()
        }
    }
)
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async(_,{dispatch,rejectWithValue,getState})=>{
        dispatch(clearCartAction())
        const state = getState();
        try{
            await(updateCart({cartID:state.cartReducer.cartID,cart:state.cartReducer.shoppingCart}))
        }catch(err){
            console.log(err);
            rejectWithValue();
        }
    }
)
export const increaseCartQuantity = createAsyncThunk(
    'cart/increaseCartQuantity',
    async (product,{dispatch,rejectWithValue,getState})=>{
        dispatch(increaseCartQuantityAction(product))
        const state = getState();
        try{
           await updateCart({cartID:state.cartReducer.cartID,cart:state.cartReducer.shoppingCart});
        }catch(err){
            console.log(err)
            rejectWithValue()
        }
    }
)
export const decreaseCartQuantity = createAsyncThunk(
    'cart/decreaseCartQuantity',
    async (product,{dispatch,rejectWithValue,getState})=>{
        dispatch(decreaseCartQuantityAction(product))
        const state = getState();
        try{
           await updateCart({cartID:state.cartReducer.cartID,cart:state.cartReducer.shoppingCart});
        }catch(err){
            console.log(err)
            rejectWithValue()
        }
    }
)


const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartID:'standart',
        shoppingCart:[],
        cartQuantity:0,
        cartSubTotal:0,
        cartDiscount:0,
        cartTotal:0,
        isLoading:true
    },
    reducers:{
        addToCartAction(state,action) {
            state.shoppingCart.push({...action.payload,quantity:1})
        },
        removeFromCartAction(state,action){
            const product = {...action.payload}
            state.shoppingCart = state.shoppingCart.filter(item=>{
                if(item.productID!==product.productID || item.modelID!==product.modelID || item.size!==product.size){
                    return item
                }
            })
        },
        increaseCartQuantityAction(state,action){
            const product = {...action.payload}
            state.shoppingCart = state.shoppingCart.map(item=>{
                if(item.productID===product.productID && item.modelID===product.modelID && item.size===product.size){
                    return {...item,quantity: item.quantity+1}
                }else{
                    return item
                }
            })
        },
        decreaseCartQuantityAction(state,action){
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
            
        },
        setDiscount(state,action){
            state.cartDiscount = action.payload;
        },
        clearCartAction(state){
            state.shoppingCart = []
            // state.cartID = 'standart';
            state.cartDiscount = 0;
        },  
    },
    
    extraReducers:(builder)=>{
        builder
        .addCase(fetchShoppingCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(fetchShoppingCart.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.shoppingCart = action.payload?.cart || []
            state.cartID = action.payload?.cartID || 'standart';
        })
        
        .addMatcher(isAnyOf,(state)=>{
            state.cartQuantity = state.shoppingCart.reduce((quantity,item)=>item.quantity+quantity,0)
            state.cartSubTotal = state.shoppingCart.reduce((subTotal,item)=>item.cost+subTotal,0)
            const temporaryTotal = state.shoppingCart.reduce((total,item)=>item.cost+total,0)
            state.cartTotal = getFinalPrice(temporaryTotal,state.cartDiscount)
        })
    }
})
export const { setDiscount,increaseCartQuantityAction,decreaseCartQuantityAction,addToCartAction,removeFromCartAction,clearCartAction } = cartSlice.actions

export default cartSlice.reducer;
