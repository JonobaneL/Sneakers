import { useEffect, useState } from "react";
import { firebaseDB } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


export const addNewUser = (user)=>{
    return setDoc(doc(firebaseDB,'users',user.id),user)
}
export const getCurrentUser = (uid) =>{
   return getDoc(doc(firebaseDB,'users',uid))
}
export const getUser = (uid) =>{
    const [user,setUser] = useState({})
        useEffect(()=>{
            getDoc(doc(firebaseDB,'users',uid))
            .then(doc=>setUser(doc.data()))
            .catch(err=>console.log(err))
        },[])
    return user
}
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