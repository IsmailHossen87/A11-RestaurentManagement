import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvier';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const locaton = useLocation()
    if(loading){
        return <div className='text-center'> <span className="loading loading-bars  loading-lg"></span></div>
    }
    if(user){
        return children
    }
    return <Navigate to={'/login'} state={locaton?.pathname}></Navigate>
};

export default PrivateRoute;