import React, { useEffect } from 'react'
import { LoginForm } from '../../components/admin'
import Header from "../../components/ui/common/Header"

const AdminLogin = () => {
    //effects
    useEffect(() => {
        document.title = "Admin Login"
    }, [])
    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <Header heading={"Sign in to Admin Account"} />
                <LoginForm />
            </div>
        </section>
    )
}

export default AdminLogin