import {shoesCategories} from '../data/shoesCategories'
import {shoesMaterial} from '../data/shoesMaterial'
import {shoesBrands} from '../data/shoesBrands'
export const getShoesData=(male)=>{
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
    return [shoesCategoriesResponse,shoesBrandsResponse,shoesMaterialResponse];
}