import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddAssignmentMarkMutation, useGetAssignmentMarkByStudentIdQuery } from '../../../features/markAssignment/markAssignmentApi';
import { firstLetterCapital, removeTitleFilter } from '../../../utils/formatting';
import Error from '../../ui/common/Error';
import Loading from '../../ui/common/Loading';
import Success from '../../ui/common/Success';
import TextInput from "../../ui/common/formInputs/TextInput";

const AssignmentForm = ({ assignment, isLoading: isAssignmentLoading, isError: isAssignmentError, setMode }) => {
    const { id, title, totalMark } = assignment[0] || {};
    const { user: loggedInUser } = useSelector(state => state.auth) || {};
    const [githubLink, setGithubLink] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    //thunks
    const [
        addAssignmentMark,
        { isLoading,
            isError,
            isSuccess
        }
    ] = useAddAssignmentMarkMutation();
    const {
        data: assignmentMark,
        isAssignmentCheckLoading,
        isAssignmentCheckError
    } = useGetAssignmentMarkByStudentIdQuery({ id, student_id: loggedInUser?.id })


    const [assignmentMarkStudent] = assignmentMark || [];
    const { mark, status, repo_link } = assignmentMarkStudent || {};
    //effects
    useEffect(() => {
        if (!isLoading && isSuccess) {
            setSuccess("Assignment Added SuccessFully! Thank you for your response.");
            setGithubLink("");
            setMode(false);
        } else if (isError) {
            setError("Can not add Assignment! Try Again later.")
        }
    }, [isSuccess, setMode, isError, isLoading])

    //defining variables
    const assignmentHeadline = removeTitleFilter(title)[0];
    const assignmentTitle = removeTitleFilter(title)[1]
    const githubRegex = /https?:\/\/github\.com\//;
    const date = new Date();
    const currentDate = date.toISOString();
    const statusClass = status === "pending" ? "text-yellow-500" : "text-teal-600"
    const formatedMark = mark === 0 && status === "pending" ? "-" : `${mark}`;
    //handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        if (githubLink.match(githubRegex)) {
            const data = {
                student_id: loggedInUser?.id,
                student_name: loggedInUser?.name,
                assignment_id: id,
                title,
                createdAt: currentDate,
                totalMark,
                mark: 0,
                repo_link: githubLink,
                status: "pending",
            }
            const confirm = window.confirm("You can not change anything after submission. Are you sure?");
            if (confirm) {
                addAssignmentMark(data);
            }
        } else {
            setError("invalid link!");
        }
    }
    const handleChange = (e) => {
        setGithubLink(e.target.value);
    }
    const handleCancel = () => {
        setMode(false);
    }

    //decide what to render
    let content;
    if (isAssignmentCheckLoading) {
        content = <Loading />
    }
    else if (!isAssignmentCheckLoading && isAssignmentCheckError) {
        content = <Error message='An error Occured! Try Again later.' />
    }
    else if (!isAssignmentCheckLoading && !isAssignmentCheckError && assignmentMark?.length === 0) {
        content = <form className='px-6 md:px-14 space-y-6 form' onSubmit={handleSubmit}>
            <TextInput
                title={"GitHub Repository Link"}
                name="github"
                value={githubLink}
                onChange={handleChange}
                placeholder="assignment github repo link "
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
                    disabled={isLoading}
                    type='submit'
                    className={`inline-flex justify-center mt-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md bg-sky-600 text-white  hover:bg-sky-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500`}
                >
                    Submit
                </button>
            </div>
            {error !== "" && <Error message={error} />}
            {success !== "" && <Success message={success} />}
        </form>
    } else if (!isAssignmentCheckLoading && !isAssignmentCheckError && assignmentMark?.length > 0) {
        content =
            <div className=' px-6 md:px-14 space-y-6 form' >
                <h3 className=' text-lg font-semibold '>আপনি যা <span className='text-sky-600'>জমা দিয়েছেন</span></h3>
                <table className='text-base w-full border border-slate-600/50 rounded-md my-4 '>
                    <thead >
                        <tr className='border border-slate-600/50 bg-sky-950'>
                            <th className="table-th !text-center border-r">Github Link</th>
                            <th className="table-th !text-center">Status</th>
                            <th className="table-th !text-center">Mark Obtained</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <th className="table-td table-td-repo text-center font-bold">{repo_link}</th>
                            <th className={`table-td text-center font-bold ${statusClass}`}>{firstLetterCapital(status)}</th>
                            <th className="table-td text-center font-bold">{formatedMark}</th>
                        </tr>
                    </tbody>
                    <tbody></tbody>
                </table>
            </div >;
    }
    return (
        <div className='form-wrapper '>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-sky-600'>{firstLetterCapital(assignmentHeadline)}</h2>

            <div className=' mt-2 px-6 md:px-14'>
                <div className='flex justify-between rounded p-2 border border-cyan'>
                    <h3 className='flex-grow'>{firstLetterCapital(assignmentTitle)}</h3>
                    <span className='ouline outline bg-cyan px-3 text-white text-xl font-semibold '>{totalMark}</span>
                </div>
                {assignmentMark?.length === 0 && <p className={`text-xs inline-flex justify-end w-full text-gray-400 after:content-['*'] after:text-pink-600 after:mx-1 `}>জমা দেওয়ার পর পরিবর্তন সম্ভব নয়</p>}
            </div>
            {content}

        </div>
    )
}

export default AssignmentForm