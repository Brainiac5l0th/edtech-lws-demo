import React from 'react';

const Success = ({ message = "Successful!" }) => {
    return <p className='success'>{message}</p>;

}

export default Success