import { shoesCoupons } from "../data/shoesCoupon"

export const getCouponDiscount=(coupon)=>{
    return shoesCoupons.find(item=>item.name === coupon)?.value||null
}