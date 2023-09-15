import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { firebaseDB } from "./firebase";


export const getOrder = (orderID) =>{
    return getDoc(doc(firebaseDB,'orders',orderID));
}
export const addNewOrder = (order)=>{
    return setDoc(doc(firebaseDB,'orders',order.orderID),order)
}
export const getUserOrders = (userID,status)=>{
    const statusOption = ['Ordered','Delivered','Canceled'];
    let ordersRef = query(
        collection(firebaseDB,'orders'),
        where('userID','==',userID)
    )
    if(statusOption.includes(status)){
        ordersRef = query(ordersRef,
            where('status','==',status))
    }
    return getDocs(ordersRef);
}