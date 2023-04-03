import React from 'react'

const QuizInfo = () => {
    return (
        <>
            <div>
                <label
                    htmlFor='videoTitle'
                    className='mt-4 block text-md font-medium text-sky-600' >
                    Videos
                </label>
                <select
                    disabled={isVideosError || videos?.length === 0}
                    id='videoTitle'
                    name="video"
                    className='mt-2 p-2 text-black focus:ring-sky-600 focus:border-sky-600 block w-full rounded-md shadow-sm text-sm bg-gray-300'
                    required>
                    <option value="" hidden className='text-sky-600'>Select Video</option>
                    {videoOptions}
                </select>
            </div>
            <TextInput
                title={"Quiz Title"}
                name="title"
                placeholder="title of the quiz"
                required />


            <div className='py-3 text-right'>
                <button
                    onClick={handleCancel}
                    type='button'
                    className='inline-flex justify-center mt-2 mr-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
                >
                    Cancel
                </button>
                <button
                    // disabled={isDisabled}
                    type='submit'
                    className={`inline-flex justify-center mt-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500`}
                >
                    Add Quiz
                </button>
            </div>
        </>
    )
}

export default QuizInfo