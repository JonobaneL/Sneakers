import { useEffect, useState } from "react"
import { getBrands, getCategories } from "../firedbAPI"
import { objectSort } from "./objectSort"
import {shoesMaterial} from '../data/shoesMaterial'


const sort_params = [
    {id:1,value:'Featured'},
    {id:2,value:'Newest'},
    {id:3,value:'Price: High to Low'},
    {id:4,value:'Price: Low to High'},
    {id:5,value:'Percent Off'},
]
const price_params = [
    {id:1,name:"Under $30"},
    {id:2,name:"$30 to $50"},
    {id:3,name:"$50 to $75"},
    {id:4,name:"$75+"},
]
const percent_params = [
    {id:1,name:"Up to 30%"},
    {id:2,name:"30% to 50%"},
    {id:3,name:"50%+"},
]

export const productsFilterParrams = (male)=>{
    const [categories,setCategories] = useState([])
    const [brands,setBrands] = useState([])
    useEffect(()=>{
        getCategories().then(categoryResponse=>{
            const filteredCategories = [];
            categoryResponse.forEach(item=>{
               const category = item.data();
               if(category.male===male || category.male==='all'){
                filteredCategories.push({id:item.id,...category})
               }
            })
            return filteredCategories;
        })
        .then(filteredCategories=>{
            const gropedCategory = objectSort(filteredCategories);
            setCategories(gropedCategory)
        })
        getBrands().then(brandsResponse=>{
            const brands = []
            brandsResponse.forEach(item=>{
                const brand = item.data();
                if(brand.male===male || brand.male === 'all'){
                    brands.push(item.data())
                }
            })
            setBrands(brands)
        })
    },[male])
   
    const materials = shoesMaterial.filter(item=>item.male === male || item.male === 'all');

    return {categories,brands,materials,sort_params,price_params,percent_params}
}