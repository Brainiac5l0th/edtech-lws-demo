import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuthCheck from '../../../../hooks/useAuthCheck';
import Loading from '../Loading';

const AuthenticateRoute = () => {
    const authChecked = useAuthCheck();
    const content = !authChecked ? <Loading /> : <Outlet />

    return content;
}

export default AuthenticateRoute