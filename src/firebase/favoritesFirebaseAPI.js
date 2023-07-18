import { firebaseDB } from "../firebase";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "@firebase/firestore"

export const getFavorites = (userId)=>{
    const favoritesRef = query(
        collection(firebaseDB,'favorites_lists'),
        where('userID','==',userId))
    return getDocs(favoritesRef)
}
export const updateFavorites = (props)=>{
    const favoritesRef = doc(firebaseDB,'shopping_cards',props.favoritesID)
    return updateDoc(favoritesRef,{
        favorites:props.favorites
    })
}