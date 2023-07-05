import { useState } from "react";
import { firebaseDB } from "./firebase";
import { collection, getDocs, getDoc } from "firebase/firestore";

const collectionRef = collection(firebaseDB,'categories');

const sortFunc = (arr)=>{
    const results = []
    const res = arr.reduce((prev,current)=>{
      return {
        ...prev,
        [current.id]:{
          ...current
        }
      }

    },{})
    Object.values(res).forEach((child) => {
      if (child.parent) {
          if (res[child.parent]) {
              const parent = res[child.parent];
              if (!parent.children) {
                  parent.children = [];
              }

              parent.children.push(child)
          }
      } else {
        results.push(child);
      }
  })
    return results
  }
// export const getCategories = async()=>{
//     const [categories,setCategories] = useState([])
//     const [isLoading,setIsLoading] = useState(true)
//     const [error,setError] = useState()
//     try{
//         const response = await getDocs(collectionRef)
//         response.forEach(item=>{
//             const item_response = {...item.data()};
//             setCategories(p=>[...p,{id:item.id,...item_response}])
//         })
//     }catch(err){
//         setError(err)
//     }
   
//     return {isLoading,categories,error}
// }
export const getCategories = ()=>{
    return getDocs(collectionRef)
}