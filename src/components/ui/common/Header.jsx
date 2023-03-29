import React from 'react'

const Header = ({ heading }) => {
    return (
        <div>
            <img className="h-12 mx-auto" src="../assets/image/learningportal.svg" alt='lws logo' />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                {heading}
            </h2>
        </div>
    )
}

export default Header