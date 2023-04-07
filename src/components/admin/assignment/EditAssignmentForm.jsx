import React, { useEffect, useState } from 'react'
import { useGetAssignmentQuery, useUpdateAssignmentMutation } from '../../../features/assignment/assignmentApi'
import { removeTitleFilter } from '../../../utils/formatting'
import Error from '../../ui/common/Error'
import Loading from '../../ui/common/Loading'
import Success from '../../ui/common/Success'
import Modal from '../../ui/common/customModal/Modal'
import TextInput from '../../ui/common/formInputs/TextInput'

const EditAssignmentForm = ({ setMode, id }) => {
    //hooks
    const [idCheck, setIdCheck] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [editAssignmentData, setEditAssignmentData] = useState({
        title: "",
        totalMark: "",
        video: ""
    })

    //thunks
    const { data: assignmentInfo, isLoading: isAssignmentLoading, isError: isAssignmentError } =
        useGetAssignmentQuery(id, { skip: !idCheck });
    const [updateAssignment, { isLoading, isSuccess, isError }] = useUpdateAssignmentMutation();


    const { video_title, video_id } = assignmentInfo || {};




    //effects
    useEffect(() => {
        if (id) setIdCheck(true);
    }, [id])

    useEffect(() => {
        if (assignmentInfo?.id) {
            setEditAssignmentData({
                title: removeTitleFilter(assignmentInfo.title)[1].trim(),
                totalMark: assignmentInfo.totalMark,
                video: assignmentInfo.video_id
            })
        }
    }, [assignmentInfo])

    useEffect(() => {
        if (isError) {
            setError("Error! Could not update the assignment!")
        }
        if (isSuccess) {
            setSuccessMessage("Success! Assignment information Added Successfully.");
            resetForm();
            setMode(false);
        }
    }, [isError, isSuccess, setMode])

    //handlers
    const resetForm = (e) => {
        setEditAssignmentData({
            title: "",
            totalMark: "",
            video: ""
        })
    }

    const handleChange = (e) => {
        setEditAssignmentData({ ...editAssignmentData, [e.target.name]: e.target.value })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        if ((parseInt(editAssignmentData.totalMark) % 100 !== 0)) {
            setError("Mark should be Divisible by 100. e.g. 100, 200")
        } else {
            const data = {
                video_title,
                title: `${removeTitleFilter(assignmentInfo.title)[0].trim()} - ${editAssignmentData.title}`,
                totalMark: parseInt(editAssignmentData.totalMark),
            }
            if (id) updateAssignment({ id, data });
        }
    }
    const handleCancel = () => {
        setMode(false);
        resetForm();
    }

    //decide options for the assignment against available videos
    const assignmentOptions = <option value={video_id}>{video_title}</option>;

    //decide what to render on content
    let content;
    if (isAssignmentLoading) {
        content =
            <Modal>
                <Loading />
            </Modal>;
    }
    else if (!isAssignmentLoading && isAssignmentError) {
        content = <Error message='Error occured! Could not get assignment information.' />;
    }
    return (
        <div className='form-wrapper '>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-sky-600'>Update Assignment</h2>
            <form className='px-6 md:px-14 space-y-6 form' onSubmit={handleEdit}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <TextInput
                        title={"Assignment Title"}
                        name="title"
                        value={editAssignmentData.title}
                        onChange={handleChange}
                        placeholder="title of the assignment"
                        required />
                    <TextInput
                        title={"Mark"}
                        //convert into number
                        name="totalMark"
                        value={editAssignmentData.totalMark}
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
                            disabled
                            id='videoTitle'
                            name="video"
                            value={editAssignmentData.video}
                            onChange={handleChange}
                            className='mt-2 p-2 text-black focus:ring-sky-600 focus:border-sky-600 block w-full rounded-md shadow-sm text-sm bg-gray-300'
                            required>
                            <option value="" hidden className='text-sky-600'>
                                Select Video
                            </option>

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
                            disabled={isLoading}
                            type='submit'
                            className={`inline-flex justify-center mt-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md bg-sky-600 text-white  hover:bg-sky-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500`}
                        >
                            Update
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

export default EditAssignmentForm