import { combineReducers, configureStore} from "@reduxjs/toolkit"
import cartReducer from './cartSlice'
import favoritesReducer from './favoritesSlice'
import authReducer from './authSlice';

const rootReducer = combineReducers({
    cartReducer:cartReducer,
    favoritesReducer:favoritesReducer,
    authReducer:authReducer
})

export const store = configureStore({
    reducer: rootReducer 
})