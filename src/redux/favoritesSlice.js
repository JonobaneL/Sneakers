import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFavorites, updateFavorites } from "../firebase/favoritesFirebaseAPI";

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async(userID)=>{
        let favorites = {};
        const response = await getFavorites(userID);
        response.forEach(item=>favorites={...item.data(),listID:item.id})

        return favorites;
    }
)
export const addToFavorites = createAsyncThunk(
    'favorites/addToFavorites',
    async(product,{dispatch,getState})=>{
        
        dispatch(addToFavoritesAction(product));
        const state = getState();
        try{
            await updateFavorites({favoritesID:state.favoritesReducer.listID,favorites:state.favoritesReducer.favorites})
        }
        catch(err){
            console.log(err)
        }
    }
)
export const removeFromFavorites = createAsyncThunk(
    'favorites/removeFromFavorites',
    async(product,{dispatch,getState})=>{
        dispatch(removeFromFavoritesAction(product));
        const state = getState();
        console.log(state.favoritesReducer)
        try{
            await updateFavorites({favoritesID:state.favoritesReducer.listID,favorites:state.favoritesReducer.favorites})
        }catch(error){
            console.log(error)
        }
    }
)

const favoritesSlice = createSlice({
    name:'favorites',
    initialState:{
        favorites:[],
        listID:'standart',
        isLoading:false,
    },
    reducers:{
        addToFavoritesAction(state,action){
            state.favorites.push(action.payload)
        },
        removeFromFavoritesAction(state,action){
            const product = {...action.payload};
            state.favorites = state.favorites.filter(item=>item.productID!==product.productID || item.modelID!==product.modelID)
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchFavorites.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(fetchFavorites.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.favorites = action.payload?.favorites || [],
            state.listID = action.payload?.listID || 'standart'
        })
    }
})
const {addToFavoritesAction, removeFromFavoritesAction} = favoritesSlice.actions;
export default favoritesSlice.reducer 