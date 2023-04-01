import React, { useEffect, useState } from 'react'
import { useGetVideoQuery, useUpdateVideoMutation } from '../../../features/videos/videosApi'
import { formatDatetoISO, formatIsoToDate } from '../../../utils/formatting'
import Error from '../../ui/common/Error'
import Loading from '../../ui/common/Loading'
import Success from '../../ui/common/Success'
import Modal from '../../ui/common/customModal/Modal'
import TextArea from '../../ui/common/formInputs/TextArea'
import TextInput from '../../ui/common/formInputs/TextInput'

const EditVideoForm = ({ setMode, id }) => {
    //hooks
    const [idCheck, setIdCheck] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [updateVideo, { isLoading, isError, isSuccess }] = useUpdateVideoMutation();
    const { data: videoInfo, isLoading: isVideoLoading, isError: isVideoError } =
        useGetVideoQuery(id, { skip: !idCheck });

    const [editVideoData, setEditVideoData] = useState({
        title: "",
        description: "",
        url: "",
        views: "",
        duration: "",
        createdAt: ""
    })

    //effects
    useEffect(() => {
        if (id) setIdCheck(true);
    }, [id])

    useEffect(() => {
        if (videoInfo?.id) {
            setEditVideoData({
                title: videoInfo.title,
                description: videoInfo.description,
                url: videoInfo.url,
                views: videoInfo.views,
                duration: videoInfo.duration,
                createdAt: formatIsoToDate(videoInfo.createdAt)
            })
        }
    }, [videoInfo])

    useEffect(() => {
        if (isError) {
            setError("Error! Could not update the video!")
        }
        if (isSuccess) {
            setSuccessMessage("Success! Video information Added Successfully.");
            resetForm();
            setMode(false);
        }
    }, [isError, isSuccess, setMode])

    //handlers
    const resetForm = (e) => {
        setEditVideoData({
            title: "",
            description: "",
            url: "",
            views: "",
            duration: "",
            createdAt: ""
        })
    }

    const handleChange = (e) => {
        setEditVideoData({ ...editVideoData, [e.target.name]: e.target.value })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const data = {
            title: editVideoData.title,
            description: editVideoData.description,
            url: editVideoData.url,
            views: editVideoData.views,
            duration: editVideoData.duration,
            createdAt: formatDatetoISO(editVideoData.createdAt),
        }
        if (id) updateVideo({ id, data });
    }
    const handleCancel = () => {
        setMode(false);
        resetForm();
    }



    //decide what to render on content
    let content;
    if (isVideoLoading) {
        content =
            <Modal>
                <Loading />
            </Modal>;
    }
    else if (!isVideoLoading && isVideoError) {
        content = <Error message='Error occured! Could not get video information.' />;
    }
    return (
        <div className='form-wrapper '>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-sky-600'>Update Video</h2>
            <form className='px-6 md:px-14 space-y-6 form' onSubmit={handleEdit}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <TextInput
                        title={"Video Title"}
                        name="title"
                        value={editVideoData.title}
                        onChange={handleChange}
                        placeholder="title of the video"
                        required />
                    <TextArea
                        title="Description"
                        name="description"
                        value={editVideoData.description}
                        onChange={handleChange}
                        placeholder="some description about the video..."
                        required />
                    <TextInput
                        title={"Youtube Video Link"}
                        name="url"
                        value={editVideoData.url}
                        onChange={handleChange}
                        placeholder="e.g. https://www.youtube.com/embed/dD9O8DnIBj4"
                        required />

                    <div className='flex md:flex-col justify-between'>
                        <TextInput
                            title={"Number of Views"}
                            name="views"
                            value={editVideoData.views} onChange={handleChange}
                            placeholder="e.g. 2.5k"
                            required />
                        <TextInput
                            title={"Duration"}
                            name="duration"
                            value={editVideoData.duration} onChange={handleChange}
                            placeholder="e.g. 25:00"
                            required />
                        <TextInput
                            title={"Upload Date"}
                            name="createdAt"
                            value={editVideoData.createdAt}
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
                            Update Video
                        </button>
                    </div>
                    {content}
                    {successMessage !== "" && <Success message={successMessage} />}
                    {error !== "" && <Error message={error} />}
                </div>
            </form>

        </div>
    )
}

export default EditVideoForm