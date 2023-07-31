import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../firebase";


export const updateUserCity = (props)=>{
    const userRef = doc(firebaseDB,'users',props.uid);
    return updateDoc(userRef,{
        city:props.city
    })
}
export const updateUserPhone = (props)=>{
    const userRef = doc(firebaseDB,'users',props.uid);
    return updateDoc(userRef,{
        phone:props.phone
    })
}
export const addPaymentMethod = (props)=>{
    const userRef = doc(firebaseDB,'users',props.uid);
    return updateDoc(userRef,{
        payment_methods: arrayUnion(props.method)
    })
} 
export const updatePaymentMethods = (props)=>{
    const userRef = doc(firebaseDB,'users',props.uid);
    return updateDoc(userRef,{
        payment_methods:props.methods
    })
}
export const addDeliveryAddress = (props)=>{
    const userRef = doc(firebaseDB,'users',props.uid);
    return updateDoc(userRef,{
        delivery_addresses:arrayUnion(props.address)
    })
}
export const updateDeliveryAddresses = (uid,addresses)=>{
    const userRef = doc(firebaseDB,'users',uid);
    return updateDoc(userRef,{
        delivery_addresses: addresses
    })
}