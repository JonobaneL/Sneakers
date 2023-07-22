import { combineReducers, configureStore} from "@reduxjs/toolkit"
import cartReducer from './cartSlice'
import favoritesReducer from './favoritesSlice'

const rootReducer = combineReducers({
    cartReducer:cartReducer,
    favoritesReducer:favoritesReducer,
})

export const store = configureStore({
    reducer: rootReducer 
})