import React from 'react'

const TextInput = ({ title, ...attributes }) => {
    return (
        <div>
            <label className='mt-4 block text-md font-medium text-sky-600'>{title}</label>
            <input type='text' className='mt-2 p-2 text-black focus:ring-sky-600 focus:border-sky-600 block w-full rounded-md shadow-sm text-sm bg-gray-300' {...attributes} />
        </div>
    )
}

export default TextInput