import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import checkoutReducer from "./checkoutSlice";
// import authReducer from './authSlice';

const rootReducer = combineReducers({
  cartReducer: cartReducer,
  favoritesReducer: favoritesReducer,
  checkoutReducer: checkoutReducer,
  // authReducer:authReducer
});

export const store = configureStore({
  reducer: rootReducer,
});
