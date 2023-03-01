import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";

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
        path:'*', 
        element:<Navigate to='/'/>
    }
]