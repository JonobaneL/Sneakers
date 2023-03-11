import {shoesBrands} from '../data/shoesBrands'
export function getMenBrands (){
    const menBrands = []
    shoesBrands.forEach(item=>{
        if(item.male==='all' || item.male==='men'){
            menBrands.push(item)
        }
    })
    return menBrands;
}
export function getWomenBrands (){
    const womenBrands = []
    shoesBrands.forEach(item=>{
        if(item.male==='all' || item.male==='women'){
            menBrands.push(item)
        }
    })
    return womenBrands;
}