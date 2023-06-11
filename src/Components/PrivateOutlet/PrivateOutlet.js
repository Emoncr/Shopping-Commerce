import React, { useContext } from 'react'
import { userContext } from '../../App'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateOutlet = () => {
    const [loggedInUser] = useContext(userContext);
    const location = useLocation();
    return (
        loggedInUser.email ? <Outlet /> : <Navigate replace to={"/login"} state={{from:location}} />
    )
}

export default PrivateOutlet