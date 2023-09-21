import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name:'checkout',
    initialState:{
        shipping:{
            addressID:'',
        }
    }
})