import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Home from "../pages/Home";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Checkout from "../pages/Checkout/Checkout";
import ShippingReturns from "../pages/Help/ShippingReturns/ShippingReturns";
import ContactUs from "../pages/Help/ContactUs/ContactUs";
import PrivacyPolicy from "../pages/Help/PrivacyPolicy/PrivacyPolicy";

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
        path:'/checkout',
        element:<Checkout/>
    },
    {
        path:'/shipping-returns',
        element:<ShippingReturns/>
    },
    {
        path:'/payment-options',
        element:<ShippingReturns/>
    },
    {
        path:'/gift-cards',
        element:<ShippingReturns/>
    },
    {
        path:'/size-charts',
        element:<ShippingReturns/>
    },
    {
        path:'/contact-us',
        element:<ContactUs/>
    },
    {
        path:'/privacy-policy',
        element:<PrivacyPolicy/>
    },
    {
        path:'*', 
        element:<Navigate to='/'/>
    }
]
