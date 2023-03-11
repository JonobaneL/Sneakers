import {shoes} from '../data/shoes';
import {shoesCategories} from '../data/shoesCategories'
import {shoesMaterial} from '../data/shoesMaterial'
import {shoesBrands} from '../data/shoesBrands'
export const getShoes=(male)=>{
    const shoesResponse = shoes.filter(item=>item.male === male || item.male === 'all')
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
    return [shoesResponse,shoesCategoriesResponse,shoesBrandsResponse,shoesMaterialResponse];
}