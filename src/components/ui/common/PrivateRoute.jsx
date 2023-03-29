import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
const PublicRoute = ({ allowedRole }) => {
    const authenticateUser = useAuth(allowedRole);

    let Content
    if (allowedRole === "student") Content = <Navigate to={"/"} />
    else if (allowedRole === "admin") Content = <Navigate to={"/admin"} />


    return authenticateUser ? <Outlet /> : Content;
}

export default PublicRoute