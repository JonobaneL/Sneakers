import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { publicRoutes } from '../routes';

const StoreRoute = () => {
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