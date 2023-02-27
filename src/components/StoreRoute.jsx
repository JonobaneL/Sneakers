import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { publicRoutes } from '../routes';

const StoreRoute = () => {
    console.log(publicRoutes)
    return (
        <Routes>
            {publicRoutes.map((item,index)=>
                <Route 
                    key={index} 
                    path={item.path} 
                    element={item.element}
                />
                )}
        </Routes>
    );
};


export default StoreRoute;