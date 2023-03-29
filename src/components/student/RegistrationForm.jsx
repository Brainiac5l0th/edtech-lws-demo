import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/auth/authApi';
import Error from '../ui/common/Error';

const RegistrationForm = () => {
    //hooks
    const navigate = useNavigate();
    const [register, { isError, isLoading, isSuccess, error: responseError }] = useRegisterMutation()
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState("");

    //effects
    useEffect(() => {
        if (isSuccess) {
            resetForm();
            // const lastVideoId = localStorage.getItem("lastVideo");
            // navigate("/course-video/${lastVideoId}");
            navigate("course-video/1");
        } else if (isError) {
            setError(responseError?.data)
        }
    }, [isSuccess, isError, responseError, navigate])

    //handlers
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }

    const resetForm = () => {
        setRegisterData({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (registerData.password !== registerData.confirmPassword) {
            setError("Passwords do not match!");
        } else {
            register({
                name: registerData.name?.trim(),
                email: registerData.email?.trim(),
                password: registerData.password,
                role: "student"
            })
        }

    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input id="name" name="name" type="name" autoComplete="name" required
                        className="login-input rounded-t-md" placeholder="Student Name" value={registerData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required
                        className="login-input " placeholder="Email address" value={registerData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required
                        className="login-input" placeholder="Password" value={registerData.password} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                    <input id="confirm-password" name="confirmPassword" type="password"
                        autoComplete="confirm-password" required className="login-input rounded-b-md"
                        placeholder="Confirm Password" value={registerData.confirmPassword} onChange={handleChange} />
                </div>
            </div>

            <div>
                <button disabled={isLoading} type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                    Create Account
                </button>
            </div>
            {error !== "" && <Error message={error} />}
        </form>
    )
}

export default RegistrationForm