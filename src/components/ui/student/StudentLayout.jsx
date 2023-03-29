import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const StudentLayout = () => {
  const { user } = useSelector(state => state.auth) || {};
  const { role } = user || {};

  //check the role if it is student.
  const content = role === "student" ? <>
    <Navbar />
    <Outlet />
  </> : <Navigate to={"/"} replace={true} />;

  return content;
}

export default StudentLayout