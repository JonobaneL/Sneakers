import { doc, getDoc, setDoc } from "firebase/firestore"
import { firebaseDB } from "./firebase";


export const getOrder = (orderID) =>{
    return getDoc(doc(firebaseDB,'orders',orderID));
}
export const addNewOrder = (order)=>{
    return setDoc(doc(firebaseDB,'orders',order.orderID),order)
}