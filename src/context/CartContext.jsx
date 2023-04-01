import React, { useContext, useState } from "react";

const CartContext = React.createContext({});


export const useShoppingCart=()=>{
    return useContext(CartContext)
}
export const CartProvider = ({children})=>{
    const [shoppingCart,setShopingCart] = useState([
        {
            id: "1002",
            size:['8'],
            colorId:2,
            quantity: 1,
        },
    ])
    console.log("Cart = ",shoppingCart)
    const addToCart =(id,size,color)=>{
        return setShopingCart(currentItems=>[...currentItems,{id,size,color,quantity:1}])
    }
    const getItemQuantity = (id)=>{
        return shoppingCart.fing(item=>item.id===id)?.quantity||0
    }
    function increaseCartQuantity(id){
        setShopingCart(currentItems=>{
            return currentItems.map(item=>{
                if(item.id === id){
                    return {...item,quantity: item.quantity+1}
                }else return item
            })
        })
    }
    function decreaseCartQuantity(id){
        setShopingCart(currentItems=>{
            if(currentItems.fing(item=>item.id===id)?.quantity === 1){
                return shoppingCart.filter(item=>item.id !== id)
            }else{
                return currentItems.map(item=>{
                    if(item.id === id){
                        return {...item,quantity: item.quantity-1}
                    }else return item
                })
            }
        })
    }
    function removeFromCart(id){
        return setShopingCart(currentItems=>{
            currentItems.filter(item=> item.id !== id)
        })
    }
    const cartQuantity = shoppingCart.reduce((quantity,item)=>item.quantity+quantity,0)
    return(
        <CartContext.Provider value={{
            shoppingCart,
            cartQuantity,
            addToCart,
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart
            }}>
            {children}
        </CartContext.Provider>
    )
}