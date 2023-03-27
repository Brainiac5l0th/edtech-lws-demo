import React from 'react'
import { LoginForm } from '../../components/student'
import { Header } from '../../components/ui/student'

const StudentLogin = () => {
    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                <Header heading={"Sign in to Student Account"} />
                <LoginForm />
            </div>
        </section>
    )
}

export default StudentLogin