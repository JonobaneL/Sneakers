import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    shipping:{
        addressID:'standart',
        company:'',
    },
    city:{},
    paymentMethod:'',
    card:null,
    status:'Ordered',
}
const checkoutSlice = createSlice({
    name:'checkout',
    initialState,
    reducers:{
        resetOrder:()=>initialState,
        setOrderDate(state,action){
            state.sortDate=action.payload.sortDate
            state.date = action.payload.date
        },
        setOrderShipping(state,action){
            if(action.payload===null){
                state.shipping = initialState.shipping;
                return
            }
            const shipping = action.payload;
            state.shipping.company = shipping.company;
            state.shipping.addressID = shipping?.addressID || 'standart'
            if(shipping.postOffice){
                state.shipping.postOffice = shipping.postOffice
            }else{
                state.shipping.appartment = shipping.appartment
                state.shipping.address = shipping.address
            }
        },
        setOrderCompany(state,action){
            state.shipping = {...initialState.shipping,company:action.payload}
        },
        setOrderPostOffice(state,action){
            state.shipping['postOffice'] = action.payload
        },
        setOrderAddress(state,action){
            const addres = action.payload
            state.shipping[addres.type] = addres.value;
        },
        setOrderCity(state,action){
            state.city = action.payload
        },
        setOrderPaymentMethod(state,action){
            state.paymentMethod = action.payload
        },
        setCardInfo(state,action){
            if(action.payload===null){
                state.card = null;
                return
            }
            state.card = action.payload
        }
    },
})
export const { 
    setOrderDate,
    resetOrder,
    setOrderShipping,
    setOrderCompany,
    setOrderPostOffice,
    setOrderAddress,
    setOrderCity,
    setOrderPaymentMethod,
    setCardInfo
    } = checkoutSlice.actions

export default checkoutSlice.reducer;