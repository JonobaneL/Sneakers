import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

export const publicRoutes = [
    {
        path:'/', 
        element:<Home/>
    },
    {
        path:'/about', 
        element:<About/>
    },
    {
        path:'/product/:id/:colorId',
        element:<ProductDetails/>
    },
    {
        path:'/shopping-cart',
        element:<ShoppingCart/>
    },
    {
        path:'/:type',
        element:<Products/>   
    },
    {
        path:'/:type/:male',
        element:<Products/>   
    },
    {
        path:'*', 
        element:<Navigate to='/'/>
    }
]
