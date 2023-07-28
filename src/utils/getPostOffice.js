import { postOffices } from "../data/shipping-data"

export const getPostOffice = (cityId,company)=>{
    console.log(cityId,company)
    return postOffices.filter(item=>item.cityId === cityId && item.company === company)
}