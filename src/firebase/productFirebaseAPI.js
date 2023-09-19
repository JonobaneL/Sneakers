import { firebaseDB } from "./firebase";
import { collection, getDocs, getDoc, doc,orderBy, query, where, updateDoc, increment } from "firebase/firestore";


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

export const getProductModels = (id)=>{
    const productModelsRef = query(
        collection(firebaseDB,'products_models'),
        where('productID','==',id));
    return getDocs(productModelsRef);
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
                wherproductse('type','==',type),
                )
            )
    }
}
export const getAllProductsModels = (
    type,
    male,
    filter=collection(firebaseDB,'products_models')
    )=>{
    if(type==='all' && male==='all'){
        return getDocs(query(
            // collection(firebaseDB,'products_models')
            filter
        ));
    }
    
    if(male){
        return getDocs(query(
            // collection(firebaseDB,'products_models'),
            filter,
            where('type','==',type),
            where('male','==',male)
        ));
    }else{
        return getDocs(query(
            // collection(firebaseDB,'products_models'),
            filter,
            where('type','==',type),
        ));
    }
   
}
export const getAllProducts = ()=>{
    const productsRef = collection(firebaseDB,'products');
    return getDocs(productsRef)
}
export const updateProductAmount = (modelID,sizes)=>{
    const productRef = doc(firebaseDB,'products_models',modelID);
    return updateDoc(productRef,{
        sizes:sizes
    })
}
// export const getFilteredProduct = (id,filter)=>{
//     return get
// }

export const expGetProducts = (type,male,filter)=>{
    if(type==='all' && male==='all'){
        return getDocs(query(
            filter
        ));
    }
    
    if(male!=='all'){
        return getDocs(query(
            filter,
            where('type','==',type),
            where('male','==',male)
        ));
    }else{
        return getDocs(query(
            filter,
            where('type','==',type),
        ));
    }
}
export const expGetModels = (productID,filter)=>{
    const modelsRef = query(filter,where('productID','==',productID))
    return getDocs(modelsRef)
}