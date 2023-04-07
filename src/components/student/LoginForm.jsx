import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStudentLoginMutation } from '../../features/auth/authApi';
import Error from '../ui/common/Error';

const LoginForm = () => {
    //hooks 
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [studentLogin, { isLoading, isError, error: responseError, isSuccess }] = useStudentLoginMutation();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //effects
    useEffect(() => {
        if (isSuccess) {
            resetForm();
            const lastVideo = localStorage?.getItem("lastVideo");
            const lastVideoId = lastVideo && JSON.parse(lastVideo)?.lastVideoId;
            console.log(JSON.parse(lastVideo)?.lastVideoId);
            navigate(`course-video/${lastVideoId}`);
        } else if (isError) {
            if (responseError?.status === "FETCH_ERROR") setError("There was an server side Error!")
            else setError("Invalid Username or Password!");
        } else {
            setError("Invalid Username or Password!")
        }
    }, [isSuccess, isError, responseError, navigate])
    //handlers
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const resetForm = () => {
        setLoginData({
            email: "",
            password: ""
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        studentLogin({
            email: loginData.email.trim(),
            password: loginData.password
        });

    }
    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required
                        className="login-input rounded-t-md" placeholder="Email address" value={loginData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required
                        className="login-input rounded-b-md" placeholder="Password" value={loginData.password} onChange={handleChange} />
                </div>
            </div>

            <div className="flex items-center justify-end">
                <div className="text-sm">
                    <Link to="/register" className="font-medium text-violet-600 hover:text-violet-500">
                        Create New Account
                    </Link>
                </div>
            </div>

            <div>
                <button type="submit" disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                    Sign in
                </button>
            </div>
            {error !== "" && <Error message={error} />}
        </form>
    )
}

export default LoginForm