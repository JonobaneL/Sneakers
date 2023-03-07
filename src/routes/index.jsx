import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import Shoes from "../pages/Shoes/Shoes";

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
        path:'/shoes/:type', 
        element:<Shoes/>
    },
    {
        path:'*', 
        element:<Navigate to='/'/>
    }
]