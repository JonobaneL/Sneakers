import { firebaseDB } from "./firebase";
import { collection, getDocs, getDoc, doc,orderBy, query, where } from "firebase/firestore";

const categoriesRef = collection(firebaseDB,'categories');
const brandsRef = collection(firebaseDB,'brands');
const brandsQuery = query(brandsRef,orderBy('name','asc'))
const categoriesQueary = query(categoriesRef,orderBy('name','asc'))

export const getCategories = ()=>{
    return getDocs(categoriesQueary)
}
export const getBrands = () => {
    return getDocs(brandsQuery)
}
export const getProduct = (id)=>{
    const productRef = doc(firebaseDB,'products',id);
    return getDoc(productRef);
}
export const getProductModel = (id)=>{
    const productRef = doc(firebaseDB,'products_models',id);
    return getDoc(productRef);
}
export const getProducts = (type='shoes',male='all')=>{
    if(male === "men" || male=='women' || male=='kids'){
        return getDocs(
            query(
                collection(firebaseDB,'products'),
                where('type','==',type),
                where('male','==',male)
                )
            )
    }else{
        return getDocs(
            query(
                collection(firebaseDB,'products'),
                where('type','==',type),
                )
            )
    }
}