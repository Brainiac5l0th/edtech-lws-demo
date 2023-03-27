import React from 'react'
import { RegistrationForm } from '../../components/student'
import Header from '../../components/ui/Header'


const Registration = () => {
    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <Header heading={"Create Your New Account"} />
                <RegistrationForm />
            </div>
        </section>
    )
}

export default Registration