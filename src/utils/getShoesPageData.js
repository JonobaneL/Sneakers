import {shoes} from '../data/shoes';
import {shoesCategories} from '../data/shoesCategories'
import {shoesMaterial} from '../data/shoesMaterial'
import {shoesBrands} from '../data/shoesBrands'
export const getShoes=(male,limit,currentPage)=>{
    const shoesTypeResponse = shoes.filter((item)=>item.male === male || item.male === 'all');
    const shoesLength = shoesTypeResponse.length;
    const shoesResponse = shoesTypeResponse.splice((currentPage-1)*limit,limit)
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
    return {shoesResponse,shoesLength,shoesCategoriesResponse,shoesBrandsResponse,shoesMaterialResponse};
}