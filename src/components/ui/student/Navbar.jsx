import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLoggedOut } from '../../../features/auth/authSlice';
import { LogoutIcon } from '../common/LogoutIcon';

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth) || {};
    const { name } = user || {};

    const handleLogOut = () => {
        dispatch(userLoggedOut());
        localStorage.removeItem("auth");
    }
    return (
        <nav className="shadow-md">
            <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
                <Link to="course-video/1">
                    <img className="h-10" src="../assets/image/learningportal.svg" alt="lws logo" />
                </Link>
                <div className="flex items-center gap-3">
                    <Link to="/leaderboard">Leaderboard</Link>
                    <h2 className="font-bold">{name}</h2>
                    <button
                        onClick={handleLogOut}
                        className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan ">
                        {LogoutIcon}
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar