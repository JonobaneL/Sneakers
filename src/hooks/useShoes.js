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
    // const filteredPrice = useMemo(()=>{
    //     const response =[];
    //     price.map(item=>{})
    // },[filteredColor,])
    return filteredColor;
}