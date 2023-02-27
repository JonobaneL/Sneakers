import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

export const publicRoutes = [
    {
        path:'/', 
        element:<Home/>
    },
    {
        path:'*', 
        element:<Navigate to='/'/>
    }
]