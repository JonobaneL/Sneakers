import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { firebaseDB } from "./firebase";


export const getOrder = (orderID) =>{
    return getDoc(doc(firebaseDB,'orders',orderID));
}
export const addNewOrder = (order)=>{
    return setDoc(doc(firebaseDB,'orders',order.orderID),order)
}
export const getUserOrders = (userID)=>{
    const ordersRef = query(
        collection(firebaseDB,'orders'),
        where('userID','==',userID)
    )
    return getDocs(ordersRef);
}