import React from 'react';

const Error = ({ message = "There was an error" }) => {
    return <p className='error'>{message}</p>;
}

export default Error