import React from 'react';
import { Navigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth = ({children}) => {
   const {currentUser} = useAuth();
   if(!currentUser) return <Navigate to='/log-in'/>

    return children;
};

export default RequireAuth;