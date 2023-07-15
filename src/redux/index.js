import { combineReducers, configureStore} from "@reduxjs/toolkit"
import cartReducer from './cartSlice'

const rootReducer = combineReducers({
    cartReducer:cartReducer
})

export const store = configureStore({
    reducer: rootReducer 
})