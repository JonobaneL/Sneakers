import { firebaseDB } from "./firebase";
import { collection, doc, getDocs, query, updateDoc, where,setDoc } from "@firebase/firestore"

export const createCart = (userID)=>{
    return setDoc(doc(firebaseDB,'shopping_carts',userID),{userID})
}
export const getCart = (userID)=>{
    const cartQuery = query(
        collection(firebaseDB,'shopping_carts'),
        where('userID','==',userID))
    return getDocs(cartQuery)
}
export const updateCart = (props)=>{
    const cartRef = doc(firebaseDB,'shopping_carts',props.cartID)
    return updateDoc(cartRef,{
        cart:props.cart
    })
}
export const getCoupon = (coupon)=>{
    const couponRef = query(
        collection(firebaseDB,'coupons'),
        where('name','==',coupon)
    )
    return getDocs(couponRef)
}
