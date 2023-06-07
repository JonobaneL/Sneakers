import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
   const {currentUser} = useAuth()
    return currentUser?<Outlet/>:<Navigate to='/log-in'/>
};

export default PrivateRoute;