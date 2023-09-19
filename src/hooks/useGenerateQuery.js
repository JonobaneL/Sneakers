import { collection, query, where } from "firebase/firestore"
import { firebaseDB } from "../firebase/firebase"

export const useGenerateQuery = (collectionName,filters)=>{
    console.log(collectionName,filters)
    let productsRef = collection(firebaseDB,collectionName)
    if(!filters) return productsRef;

    Object.keys(filters).forEach(key=>{
        if(Array.isArray(filters[key])){
            if(filters[key].length>=1){
                productsRef = query(productsRef,where(key,'in',filters[key]))
            }
        }else{
            productsRef = query(productsRef,where(key,'==',filters[key]))
        }
    })
    return productsRef;
}