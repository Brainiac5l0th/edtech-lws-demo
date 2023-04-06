import React, { useEffect, useState } from 'react'
import { useAddAssignmentMutation, useGetAssignmentsQuery } from '../../../features/assignment/assignmentApi'
import { useGetVideosQuery } from '../../../features/videos/videosApi'
import { filterAssignmentTitle, hasAssignment } from '../../../utils/formatting'
import Error from '../../ui/common/Error'
import Loading from '../../ui/common/Loading'
import Success from '../../ui/common/Success'
import Modal from '../../ui/common/customModal/Modal'
import TextInput from '../../ui/common/formInputs/TextInput'

const AddAssignmentForm = ({ setMode }) => {

    //hooks
    const [addAssignment, { isLoading, isError, isSuccess }] = useAddAssignmentMutation();
    const { data: assignments } = useGetAssignmentsQuery();
    const { data: videos, isVideosLoading, isError: isVideosError } = useGetVideosQuery();
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [assignmentData, setAssignmentData] = useState({
        title: "",
        totalMark: "",
        video: ""
    })

    //effects
    useEffect(() => {
        if (isError) {
            setError("Can not add assignment details!");
        }
        else if (!isError && isSuccess) {
            setSuccessMessage("Assignment added successfully!");
            setMode(false);
            resetForm();
        }
    }, [isError, isSuccess, setMode])

    //effect for disabled button
    useEffect(() => {
        if (videos?.every(video => hasAssignment(video.id, assignments))) {
            setError("Can't add assignment! Each Video contains one.")
        }
    }, [assignments, videos])

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


    //decide options for the assignment against available videos
    const assignmentOptions = videos &&
        videos?.length > 0 && videos?.map(
            video => <option key={video.id} value={video.id} disabled={hasAssignment(video.id, assignments)} >{video.title}</option>);

    //css classnames
    //disabled button if there is no videos or every video has assignment
    const isDisabled = isLoading || isVideosError || videos?.length === 0 || videos?.every(video => hasAssignment(video.id, assignments));
    const btnClass = isDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-sky-600 text-white  hover:bg-sky-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500";



    //handlers
    const resetForm = (e) => {
        setAssignmentData({
            title: "",
            totalMark: "",
            video: ""
        })
    }

    const handleChange = (e) => {
        setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value });
    }
    //add assignment handler
    const handleAdd = (e) => {
        e.preventDefault();

        //check if total mark is divisible by 100
        if ((parseInt(assignmentData.totalMark) % 100 !== 0)) {
            setError("Mark should be Divisible by 100. e.g. 100, 200")
        } else {
            setError("");
            //filtering
            //get that video id by the chosen video
            const videoObject =
                videos?.find(video => Number(video.id) === Number(assignmentData.video)) || {};
            //assignment 1 - title
            const assignmentTitle = filterAssignmentTitle(assignments, assignmentData.title);

            //pass to the thunk
            addAssignment({
                title: assignmentTitle,
                video_id: videoObject?.id,
                video_title: videoObject?.title,
                totalMark: parseInt(assignmentData.totalMark)
            })
        }
    }
    const handleCancel = () => {
        setMode(false);
        resetForm();
    }
    return (
        <div className='form-wrapper '>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-sky-600'>Add Assignment</h2>
            <form className='px-6 md:px-14 space-y-6 form' onSubmit={handleAdd}>
                <div className="rounded-md shadow-sm -space-y-px">

                    <TextInput
                        title={"Assignment Title"}
                        name="title"
                        value={assignmentData.title}
                        onChange={handleChange}
                        placeholder="title of the assignment"
                        required />
                    <TextInput
                        title={"Mark"}
                        //convert into number
                        name="totalMark"
                        value={assignmentData.totalMark}
                        onChange={handleChange}
                        placeholder="Total mark for the assignment"
                        required />
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
                            value={assignmentData.video}
                            onChange={handleChange}
                            className='mt-2 p-2 text-black focus:ring-sky-600 focus:border-sky-600 block w-full rounded-md shadow-sm text-sm bg-gray-300'
                            required>
                            <option value="" hidden className='text-sky-600'>Select Video</option>
                            {assignmentOptions}
                        </select>
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
                            disabled={isDisabled}
                            type='submit'
                            className={`inline-flex justify-center mt-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md  ${btnClass}`}
                        >
                            Add Assignment
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

export default AddAssignmentForm