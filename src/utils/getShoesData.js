import {shoesCategories} from '../data/shoesCategories'
import {shoesMaterial} from '../data/shoesMaterial'
import {shoesBrands} from '../data/shoesBrands'

const SORT_PARAMS = [
    {id:1,value:'Top Rated'},
    {id:2,value:'Newest'},
    {id:3,value:'Price: High to Low'},
    {id:4,value:'Price: Low to High'},
    {id:5,value:'Percent Off'},
]
const PRICE_PARAMS = [
    {id:1,name:"Under $30"},
    {id:2,name:"$30 to $50"},
    {id:3,name:"$50 to $75"},
    {id:4,name:"$75+"},
]
const PERCENT_PARAMS = [
    {id:1,name:"Up to 30%"},
    {id:2,name:"30% to 50%"},
    {id:3,name:"50%+"},
]

export const getShoesFiltersData=(male)=>{
    const shoesCategoriesResponse = shoesCategories.filter(item=>{
        if(item.male === male || item.male === 'all'){
            if(item["sub-category"]){
                item["sub-category"]= item["sub-category"].filter(subItem => subItem.male === male || subItem.male === 'all' ) 
            }
            return item
        }
    });
    const shoesMaterialResponse = shoesMaterial.filter(item=>item.male === male || item.male === 'all');
    const shoesBrandsResponse = shoesBrands.filter(item=>item.male === male || item.male === 'all');
    return [shoesCategoriesResponse,shoesBrandsResponse,shoesMaterialResponse,SORT_PARAMS,PRICE_PARAMS,PERCENT_PARAMS];
}