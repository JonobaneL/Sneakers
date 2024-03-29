import React, { Suspense, lazy } from 'react';
import {Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About, { aboutLoader } from '../pages/About';
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart';
import RequireAuth from './PrivateRoute';
import UserInfoSettings from '../components/UserInfoSettings/UserInfoSettings';
import Loader from '../components/UI/loader/Loader';

const Products = lazy(()=>import('../pages/Products/Products'))
const Checkout = lazy(()=>import('../pages/Checkout/Checkout'))
const ShippingReturns = lazy(()=>import('../pages/Help/ShippingReturns/ShippingReturns'))
const ContactUs = lazy(()=>import('../pages/Help/ContactUs/ContactUs'))
const PrivacyPolicy = lazy(()=>import("../pages/Help/PrivacyPolicy/PrivacyPolicy"))
const SignUp = lazy(()=>import("../pages/SignUp/SignUp"));
const ProductDetails = lazy(()=>import('../pages/ProductDetails/ProductDetails'));
const LogIn = lazy(()=>import("../pages/LogIn/LogIn"));
const UserProfile = lazy(()=>import("../pages/UserProfile/UserProfile"));
const PasswordReset = lazy(()=>import('../pages/PasswordReset/PasswordReset'));
const OrderInfo = lazy(()=>import('../pages/OrderInfo/OrderInfo'));
const UserInfo = lazy(()=>import('../components/UserInfo/UserInfo'));
const Favorites = lazy(()=>import('../components/Favorites/Favorites'));
const UserOrders = lazy(()=>import('../components/UserOrders/UserOrders'));
const UserOrder = lazy(()=>import('../components/UserOrder/UserOrder'));

const StoreRoutes = () => {
    return (
        <Suspense fallback={<div className='page-loader'><Loader/></div>}>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>} loader={aboutLoader}/>
                <Route path='/product/:id/:modelId' element={<ProductDetails/>} loader={async()=>{
                    return await fetch('https://jsonplaceholder.typicode.com/todos/1')
                }}/>
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
                <Route path='/user-profile/' element={<RequireAuth>
                    <UserProfile />
                </RequireAuth>}>
                    <Route path='info' element={<RequireAuth><UserInfo/></RequireAuth>}/>
                    <Route path='orders' element={<RequireAuth><UserOrders/></RequireAuth>}/>
                    <Route path='orders/:orderID' element={<RequireAuth><UserOrder/></RequireAuth>}/>
                    <Route path='info-settings' element={<RequireAuth><UserInfoSettings/></RequireAuth>}/>
                    <Route path='favorites' element={<RequireAuth><Favorites/></RequireAuth>}/>
                </Route>
                
                <Route path='/password-reset' element={<RequireAuth><PasswordReset/></RequireAuth>} />
                <Route path='/order-info/:orderID' element={<OrderInfo/>}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
        </Suspense>
    );
};


export default StoreRoutes;