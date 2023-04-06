import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from "../../../../hooks/useAuth";

const PublicRoute = ({ allowedRole }) => {
    const authenticateUser = useAuth(allowedRole);
    const { user } = useSelector((state) => state.auth) || {};

    let content;
    //allowedRole == student means, these routes are only allowed for students
    if (allowedRole === "student") {
        //check actual role of user if user is student the redirect to video page 
        if (user?.role === 'admin') {
            content = <Navigate to={"/admin/dashboard"} replace={true} />
        } else {
            content = <Navigate to={"/course-video/1"} replace={true} />
        }
    }//allowedRole == admin means, these routes are only allowed for admin 
    else if (allowedRole === "admin") {
        if (user?.role === 'student') {
            content = <Navigate to={"/course-video/1"} replace={true} />
        }
        else {
            content = <Navigate to={"/admin/dashboard"} replace={true} />
        }
    }

    return !authenticateUser && !user?.id ? <Outlet /> : content;
}

export default PublicRoute