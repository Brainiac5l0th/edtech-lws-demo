import React, { useEffect, useState } from 'react'
import { useAddVideoMutation } from '../../../features/videos/videosApi'
import { formatDatetoISO } from '../../../utils/formatting'
import Error from '../../ui/common/Error'
import Success from '../../ui/common/Success'
import TextArea from '../../ui/common/formInputs/TextArea'
import TextInput from '../../ui/common/formInputs/TextInput'

const AddVideoForm = ({ setMode }) => {

    //hooks
    const [addVideo, { isLoading, isError, isSuccess }] = useAddVideoMutation();
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [addVideoData, setAddVideoData] = useState({
        title: "",
        description: "",
        url: "",
        views: "",
        duration: "",
        createdAt: ""
    })

    //effects
    useEffect(() => {
        if (isError) {
            setError("Can not add video details!");
        }
        else if (!isError && isSuccess) {
            setSuccessMessage("Video added successfully!");
            setMode(false);
            resetForm();
        }
    }, [isError, isSuccess, setMode])

    //handlers
    const resetForm = (e) => {
        setAddVideoData({
            title: "",
            description: "",
            url: "",
            views: "",
            duration: "",
            createdAt: ""
        })
    }

    const handleChange = (e) => {
        setAddVideoData({ ...addVideoData, [e.target.name]: e.target.value });
    }

    const handleAdd = (e) => {
        e.preventDefault();
        addVideo({
            title: addVideoData.title,
            description: addVideoData.description,
            views: addVideoData.views,
            url: addVideoData.url,
            duration: addVideoData.duration,
            createdAt: formatDatetoISO(addVideoData.createdAt),
        })
    }
    const handleCancel = () => {
        setMode(false);
        resetForm();
    }

    return (
        <div className='form-wrapper '>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-sky-600'>Add Video</h2>
            <form className='px-6 md:px-14 space-y-6 form' onSubmit={handleAdd}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <TextInput
                        title={"Video Title"}
                        name="title"
                        value={addVideoData.title}
                        onChange={handleChange}
                        placeholder="title of the video"
                        required />
                    <TextArea
                        title="Description"
                        name="description"
                        value={addVideoData.description}
                        onChange={handleChange}
                        placeholder="some description about the video..."
                        required />
                    <TextInput
                        title={"Youtube Video Link"}
                        name="url"
                        value={addVideoData.url}
                        onChange={handleChange}
                        placeholder="e.g. https://www.youtube.com/embed/dD9O8DnIBj4"
                        required />
                    <div className='flex md:flex-col justify-between'>
                        <TextInput
                            title={"Number of Views"}
                            name="views"
                            value={addVideoData.views} onChange={handleChange}
                            placeholder="e.g. 2.5k"
                            required />
                        <TextInput
                            title={"Duration"}
                            name="duration"
                            value={addVideoData.duration} onChange={handleChange}
                            placeholder="e.g. 25:00"
                            required />
                        <TextInput
                            title={"Upload Date"}
                            name="createdAt"
                            value={addVideoData.createdAt}
                            onChange={handleChange}
                            placeholder="e.g. dd/mm/yyyy"
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
                            type='submit'
                            disabled={isLoading}
                            className='inline-flex justify-center mt-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
                        >
                            Add Video
                        </button>
                    </div>

                    {successMessage !== "" && <Success message={successMessage} />}
                    {error !== "" && <Error message={error} />}
                </div>
            </form>
        </div>
    )
}

export default AddVideoForm