import React from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';
import Products from '../pages/Products/Products';
import Checkout from "../pages/Checkout/Checkout";
import ShippingReturns from "../pages/Help/ShippingReturns/ShippingReturns";
import ContactUs from "../pages/Help/ContactUs/ContactUs";
import PrivacyPolicy from "../pages/Help/PrivacyPolicy/PrivacyPolicy";
import SignUp  from "../pages/SignUp/SignUp";
import LogIn from "../pages/LogIn/LogIn";
import UserProfile from "../pages/UserProfile/UserProfile";
import RequireAuth from './PrivateRoute';
import PasswordReset from '../pages/PasswordReset/PasswordReset';
import UserInfo from '../components/UserInfo/UserInfo';


const StoreRoutes = () => {
    return (
        <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/product/:id/:modelId' element={<ProductDetails/>}/>
                <Route path='/shopping-cart' element={<ShoppingCart/>}/>
                <Route path='/:type' element={<Products/>}/>
                <Route path='/:type/:male' element={<Products/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/shipping-returns' element={<ShippingReturns/>}/>
                <Route path='/payment-options' element={<ShippingReturns/>}/>
                <Route path='/gift-cards' element={<ShippingReturns/>}/>
                <Route path='/size-charts' element={<ShippingReturns/>}/>
                <Route path='/contact-us' element={<ContactUs/>}/>
                <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/log-in' element={<LogIn/>}/>
                <Route path='/user-profile/*' element={<RequireAuth>
                    <UserProfile />
                </RequireAuth>}>
                    <Route path='info' element={<UserInfo/>}/>
                    <Route path='orders' element={<p>Orders Route</p>}/>
                    <Route path='favorites' element={<p>Favorites Route</p>}/>
                </Route>
                    
                <Route path='/password-reset' element={<PasswordReset/>} />
                <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
    );
};


export default StoreRoutes;