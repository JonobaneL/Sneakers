import { firebaseDB } from "./firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "@firebase/firestore"

export const getCart = (userID)=>{
    const cartQuery = query(
        collection(firebaseDB,'shopping_cards'),
        where('userID','==',userID))
    return getDocs(cartQuery)
}
export const updateCart = (props)=>{
    const cartRef = doc(firebaseDB,'shopping_cards',props.cartID)
    return updateDoc(cartRef,{
        cart:props.cart
    })
}
export const updateCartDiscount = (props)=>{
    const cartRef = doc(firebaseDB,'shopping_cards',props.cartID)
    return updateDoc(cartRef,{
        cart_discount:props.discount
    })
}

export const getCoupon = (coupon)=>{
    const couponRef = query(
        collection(firebaseDB,'coupons'),
        where('name','==',coupon)
    )
    return getDocs(couponRef)
}