import {sneakersBrands} from '../data/sneakersBrands'
export function getMenBrands (){
    const menBrands = []
    sneakersBrands.forEach(item=>{
        if(item.male==='all' || item.male==='men'){
            menBrands.push(item)
        }
    })
    return menBrands;
}
export function getWomenBrands (){
    const womenBrands = []
    sneakersBrands.forEach(item=>{
        if(item.male==='all' || item.male==='women'){
            menBrands.push(item)
        }
    })
    return womenBrands;
}