import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AdminLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default AdminLayout