import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AdminLayout = () => {
    const { user } = useSelector(state => state.auth) || {};
    const { role } = user || {};

    //check the role if it is admin.
    return role === "admin" ? <>
        <Navbar />
        <Outlet />
    </> : <Navigate to={-1} />
}

export default AdminLayout