import { useSelector } from "react-redux"

export const checkCheckout = (userInfo)=>{
    const checkout = useSelector(state=>state.checkoutReducer)
    const userCheck = !userInfo.includes(false)
}