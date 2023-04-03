import React, { useState } from 'react';
import { useGetVideosQuery } from '../../../features/videos/videosApi';
import Error from '../../ui/common/Error';
import Loading from '../../ui/common/Loading';
import Success from '../../ui/common/Success';
import Modal from '../../ui/common/customModal/Modal';
import TextInput from '../../ui/common/formInputs/TextInput';
import FormStepper from './FormStepper';

const AddQuizzesForm = ({ setMode }) => {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    //thunks
    const { data: videos, isVideosLoading, isError: isVideosError } = useGetVideosQuery();
    //handlers
    const resetForm = (e) => {

    }
    //add quiz handler
    const handleAdd = (e) => {
        e.preventDefault();
    }
    const handleCancel = () => {
        setMode(false);
        resetForm();
    }

    //decide options for the quiz against available videos
    const videoOptions = videos && videos?.length > 0 &&
        videos?.map(video => <option key={video.id} value={video.id} >{video.title}</option>);

    //decide content based on videos query
    let content;
    if (isVideosLoading) {
        content = <Modal>
            <Loading />
        </Modal>
    } else if (!isVideosLoading && isVideosError) {
        content = <Error message={"There was an error in server side! Sorry for the issue."} />
    } else if (!isVideosLoading && !isVideosError && videos?.length === 0) {
        content = <Error message={"No videos Found"} />
    }
    return (
        <div className='form-wrapper '>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-sky-600'>Add Quiz</h2>
            <form className='px-6 md:px-14 space-y-6 form' onSubmit={handleAdd}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <FormStepper />
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
                    <div>
                        <label className='mt-4 block text-md font-medium text-sky-600'>Options</label>
                        <TextInput
                            title={"option #1"}
                            name="title"
                            placeholder="option #1"
                            required />
                        <TextInput
                            title={"option #2"}
                            name="title"
                            placeholder="option #2"
                            required />
                    </div>

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
                    {content}
                    {successMessage !== "" && <Success message={successMessage} />}
                    {error !== "" && <Error message={error} />}
                </div>
            </form >
        </div >
    )
}

export default AddQuizzesForm