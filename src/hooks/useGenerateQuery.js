import { collection, query, where } from "firebase/firestore"
import { firebaseDB } from "../firebase/firebase"

export const useGenerateQuery = (collectionName,filters)=>{
    // console.log('useGenerateQuery - filters',filters)
    let productsRef = collection(firebaseDB,collectionName)
    let productsRef1 = collection(firebaseDB,collectionName)

    if(!filters) return productsRef1;

    Object.keys(filters).forEach(key=>{
        if(Array.isArray(filters[key])){
            if(filters[key].length>=1){
                productsRef1 = query(productsRef1,where(key,'in',filters[key]))
            }
        }else{
            if(filters[key]!==null){
            console.log(filters[key])
                productsRef1 = query(productsRef1,where(key,'==',filters[key]))
            }
            
        }
    })
    // Object.keys(filters).forEach(key=>{
    //     if(Array.isArray(filters[key])){
    //         if(filters[key].length>=1){
    //             productsRef = query(productsRef,where(key,'in',filters[key]))
    //         }
    //     }else{
    //         productsRef = query(productsRef,where(key,'==',filters[key]))
    //     }
    // })
    return productsRef1;
}