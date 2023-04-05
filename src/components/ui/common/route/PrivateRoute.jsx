import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from "../../../../hooks/useAuth";
const PrivateRoute = ({ allowedRole }) => {
    const authenticateUser = useAuth();

    const { user } = useSelector((state) => state.auth) || {};

    let content;
    //allowedRole == student means, these routes are only allowed for students
    if (allowedRole === "student") {
        //check actual role of user if user is student the redirect to video page 
        if (user?.role === 'admin') {
            content = <Navigate to={"/admin"} replace={true} />
        } else {
            content = <Navigate to={"/"} replace={true} />
        }
    }//allowedRole == admin means, these routes are only allowed for admin 
    else if (allowedRole === "admin") {
        if (user?.role === 'student') {
            content = <Navigate to={"/"} replace={true} />
        }
        else {
            content = <Navigate to={"/admin"} replace={true} />
        }
    }


    return authenticateUser ? <Outlet /> : content;
}

export default PrivateRoute