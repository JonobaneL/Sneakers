import { useMemo } from "react"
export const useShoesMale = (shoes,male='')=>{
    const filterByMale = useMemo(()=>{
        if(male.length>0){
            return shoes.filter(item=>item.male==male||item.male=='all')
        }else{
            return shoes
        }
    },[shoes,male])
    return filterByMale;
}

export const useShoes = (shoes,male,brand=[],color=[],price=[])=>{
   const maleFiltered = useShoesMale(shoes,male)
    const filteredBrand = useMemo(()=>{
        if(brand.length>0){
            return maleFiltered.filter(item=>
                {
                    if(brand.includes(item.brand))return item
                })
        }else return maleFiltered
    },[maleFiltered,brand]);
    const filteredColor = useMemo(()=>{
        if(color.length>0){
            return filteredBrand.filter(item=>
                {
                    if(color.includes(item.filterColor))return item
                })
        }else return filteredBrand
    },[filteredBrand,color])
    const filteredPrice = useMemo(()=>{
        const result = []
            price.forEach(price_item=>{
                switch(price_item){
                    case 'Under $30':
                        result.push(...filteredColor.filter(item=>item.price>0 && item.price<30));
                        break;
                    case '$30 to $50':
                        result.push(...filteredColor.filter(item=>item.price>=30 && item.price<50));
                        break;
                    case '50 to $75':
                        result.push(...filteredColor.filter(item=>item.price>=50 && item.price<75));
                        break;
                    case '$75+':
                        result.push(...filteredColor.filter(item=>item.price>=75 && item.price<500000));
                        break;
                }
            })
            if(price.length==0){
                return filteredColor
            }
            else return result;
    },[filteredColor,price])
    return filteredPrice;
}