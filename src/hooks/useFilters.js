import { useMemo } from "react"
import { getFinalPrice } from "../utils/getFinalPrice"
import { priceSort } from "../utils/priceSort"
import { useAsync } from "./useAsync"
import { getProducts } from "../firedbAPI"

const useSort = (products,sortMethod) =>{
    const response = useMemo(()=>{
        if(sortMethod){
            switch(sortMethod){
                case 1:
                    return products
                case 2:
                    return products
                case 3:
                    return priceSort(products,'highTolow');
                case 4:
                    return priceSort(products);
                case 5:
                    return products.filter(item=>item.discount>0)
            }
        }else{
            return products;
        }
    },[products,sortMethod])
    return response;
}
export const useFiltered = (type,male,sortMethod,category=[],brand=[],color=[],price=[],percent=[],size=[],material=[])=>{
   const [isLoading,,productsResponse] = useAsync(()=>getProducts(type,male),[type,male],'firebase')
   const sortRes = useSort(productsResponse,sortMethod)
   const filteredCategories = useMemo(()=>{
        if(category.length>0){
           return sortRes.filter(item=>{
            if(category.includes(item.category) && category.length==1){
                return item
            }
            else if(category.includes(item.category) && category.length>1){
                if(category.includes(item['sub-category'])) return item
            }
        })
        }else return sortRes
   },[sortRes,category])

    const filteredBrand = useMemo(()=>{
        if(brand.length>0){
            return filteredCategories.filter(item=>
                {
                    if(brand.includes(item.brand))return item
                })
        }else return filteredCategories
    },[filteredCategories,brand]);
    
    const filteredColor = useMemo(()=>{
        if(color.length>0){
            return filteredBrand.filter(item=>
                {
                    if(color.includes(item.f_color))return item
                })
        }else return filteredBrand
    },[filteredBrand,color])
    
    const filteredPrice = useMemo(()=>{
        const result = []
            price.forEach(price_item=>{
                switch(price_item){
                    case 'Under $30':
                        result.push(...filteredColor.filter(item=>{
                            const fp = getFinalPrice(item.price,item.f_discount)
                            if(fp>0 && fp<30) return item
                        }));
                        break;
                    case '$30 to $50':
                        result.push(...filteredColor.filter(item=>{
                            const fp = getFinalPrice(item.price,item.f_discount)
                            if(fp>=30 && fp<50) return item
                        }));
                        break;
                    case '$50 to $75':
                        result.push(...filteredColor.filter(item=>{
                            const fp = getFinalPrice(item.price,item.f_discount)
                            if(fp>=50 && fp<75) return item
                        }));
                        break;
                    case '$75+':
                        result.push(...filteredColor.filter(item=>{
                            const fp = getFinalPrice(item.price,item.f_discount)
                            if(fp>=75 && fp<500000) return item
                        }));
                        break;
                }
            })
            if(price.length==0){
                return filteredColor
            }
            else return result;
    },[filteredColor,price])

    const filteredPercent = useMemo(()=>{
        const result = []
            percent.forEach(percent_item=>{
                switch(percent_item){
                    case 'Up to 30%':
                        result.push(...filteredColor.filter(item=>item.f_discount>0 && item.f_discount<30));
                        break;
                    case '30% to 50%':
                        result.push(...filteredColor.filter(item=>item.f_discount>=30 && item.f_discount<50));
                        break;
                    case '50%+':
                        result.push(...filteredColor.filter(item=>item.f_discount>=50 && item.f_discount<=100));
                        break;
                }
            })
            if(percent.length==0){
                return filteredPrice
            }
            else return result;
    },[filteredPrice, percent])

    const fitleredSize = useMemo(()=>{
        if(size.length>0){
            return filteredPercent.filter(item=>{
                if(size.some(size_item=>item.sizes.includes(size_item))) return item
            });
        }
        else return filteredPercent
    },[filteredPercent,size])

    const filteredMaterial = useMemo(()=>{
        if(material.length>0){
            return fitleredSize.filter(item=>material.includes(item.material))
        }else return fitleredSize
    },[material,fitleredSize])
    return [filteredMaterial,isLoading];
}

export const useToShow = (data,limit,current=1)=>{
    const response = useMemo(()=>{
        return data.filter((_,index)=>index>=((current*limit)-limit)&&index<(current*limit));
    },[data,current]) 
    return response;
}