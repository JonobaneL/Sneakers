import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import ShoeDetails from "../pages/ShoeDetails/ShoeDetails";
import Shoes from "../pages/Shoes/Shoes";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import Products from "../pages/Products/Products";

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
        path:'tmp/:type', 
        element:<Shoes/>
    },
    {
        path:'/product/:id/:colorId',
        element:<ShoeDetails/>
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
