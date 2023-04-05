import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from "../../../../hooks/useAuth";

const PublicRoute = ({ allowedRole }) => {
    const authenticateUser = useAuth();
    const { user } = useSelector((state) => state.auth) || {};
    const lastVideo = localStorage?.getItem("lastVideo") || "1";
    const { lastVideoId, student_id } = lastVideo;
    console.log(authenticateUser && user?.id === student_id && lastVideoId);
    let studentRoute;
    if (lastVideoId) {
        if (authenticateUser && user?.id === student_id && lastVideoId) {
            studentRoute = `/course-video/${1}`
        }
    } else {
        studentRoute = `/course-video/1`
    }

    let content;
    //allowedRole == student means, these routes are only allowed for students
    if (allowedRole === "student") {
        //check actual role of user if user is student the redirect to video page 
        if (user?.role === 'student') {
            content = <Navigate to={studentRoute} />
        }
        else if (user?.role === 'admin') {
            content = <Navigate to={-1} />
        }
    }//allowedRole == admin means, these routes are only allowed for students 
    else if (allowedRole === "admin") {
        if (user?.role === 'student') {
            content = <Navigate to={-1} />
        }
        else if (user?.role === 'admin') {
            content = <Navigate to={"/admin/dashboard"} />
        }
    }


    return !authenticateUser ? <Outlet /> : content;
}

export default PublicRoute