import React from 'react'
import { Link } from 'react-router-dom'
import { LogoutIcon } from '../LogoutIcon'

const Navbar = () => {
    return (
        <nav className="shadow-md">
            <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
                <Link to="/admin/dashboard">
                    <img className="h-10" src="../assets/image/learningportal.svg" alt="lws logo" />
                </Link>
                <div className="flex items-center gap-3">
                    <h2 className="font-bold">Admin</h2>
                    <button
                        className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium">
                        {LogoutIcon}
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar