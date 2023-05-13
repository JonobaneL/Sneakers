import React, { useContext, useState } from "react";
import { useProduct } from "../hooks/useProduct";

const CartContext = React.createContext({});


export const useShoppingCart=()=>{
    return useContext(CartContext)
}
export const CartProvider = ({children})=>{
    const [shoppingCart,setShopingCart] = useState([])
    const [cartDiscount,setCartDiscount] = useState(0)
    const addToCart =(id,size,colorId)=>{
        return setShopingCart(currentItems=>[...currentItems,{id,size,colorId,quantity:1}])
    }
    const getItemQuantity = (id)=>{
        return shoppingCart.fing(item=>item.id===id)?.quantity||0
    }
    function increaseCartQuantity(id,colorId,size){
        setShopingCart(currentItems=>{
            return currentItems.map(item=>{
                if(item.id === id && item.colorId === colorId && item.size === size){
                    return {...item,quantity: item.quantity+1}
                }else return item
            })
        })
    }
    function decreaseCartQuantity(id,colorId,size){
        setShopingCart(currentItems=>{
            if(currentItems.find(item=>item.id===id && item.colorId === colorId && item.size === size)?.quantity === 1){
                return shoppingCart.filter(item=>item.id !== id || item.colorId !== colorId || item.size !== size)
            }else{
                return currentItems.map(item=>{
                    if(item.id === id && item.colorId === colorId && item.size === size){
                        return {...item,quantity: item.quantity-1}
                    }else return item
                })
            }
        })
    }
    function removeFromCart(id,colorId,size){
        setShopingCart(currentItems=>currentItems.filter(item=> {
                if(item.id !==id || item.colorId!==colorId || item.size!== size){
                    return item;
                }
                else{return null}
            })
        )
    }
    
    const cartSubTotal = shoppingCart.reduce((total,cartItem)=>{
       const item = useProduct(cartItem.id,cartItem.colorId);
       return total+(item?.cost||0)*cartItem.quantity; 
    },0).toFixed(2);
    const cartQuantity = shoppingCart.reduce((quantity,item)=>item.quantity+quantity,0)
    const cartTotal = ()=>{
        const discount = Math.floor(cartSubTotal)*(cartDiscount/100)
        return (
            (cartSubTotal - discount).toFixed(2)
        )
    } 
    return(
        <CartContext.Provider value={{
            shoppingCart,
            cartQuantity,
            cartSubTotal,
            addToCart,
            cartDiscount,
            setCartDiscount,
            cartTotal,
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart
            }}>
            {children}
        </CartContext.Provider>
    )
}