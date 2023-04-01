import React from 'react'

const TextArea = ({ title, ...attibutes }) => {
    return (
        <div>
            <label className='mt-4 block text-md font-medium text-sky-600'>{title}</label>
            <textarea rows="4" cols="50" className='mt-2 p-2 text-black focus:ring-sky-600 focus:border-sky-600 block w-full rounded-md shadow-sm text-sm bg-gray-300' {...attibutes} />
        </div>
    )
}

export default TextArea