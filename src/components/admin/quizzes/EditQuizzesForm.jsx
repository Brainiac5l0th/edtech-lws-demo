import _ from "lodash";
import React, { useEffect, useState } from 'react';
import {
    useGetQuizQuery,
    useUpdateQuizMutation,
    useUpdateQuizWithOptionsMutation
} from '../../../features/quizzes/quizzesApi';
import { useGetVideosQuery } from '../../../features/videos/videosApi';
import Error from '../../ui/common/Error';
import Loading from '../../ui/common/Loading';
import Success from '../../ui/common/Success';
import Modal from '../../ui/common/customModal/Modal';
import Confirmation from './FormStepper/Confirmation';
import QuizInfo from './FormStepper/QuizInfo';
import QuizOptions from './FormStepper/QuizOptions';

const EditQuizzesForm = ({ mode, setMode, id }) => {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        video: "",
        question: "",
        options: [
            { id: 1, option: "", isCorrect: false },
            { id: 2, option: "", isCorrect: false },
        ],
    });

    //thunks
    const { data: videos, isVideosLoading, isError: isVideosError } = useGetVideosQuery();
    const {
        data: quizInfo,
        isQuizLoading,
        isQuizError } = useGetQuizQuery(id);
    const [
        updateQuiz,
        {
            isLoading: isUpdateQuizLoading,
            isError: isUpdateQuizError,
            isSuccess: isUpdateQuizSuccess
        }] = useUpdateQuizMutation();
    const [
        updateQuizWithOptions,
        {
            isLoading: isUpdateWithOptionsLoading,
            isError: isUpdateWithOptionsError,
            isSuccess: isUpdateWithOptionsSuccess
        }] = useUpdateQuizWithOptionsMutation();

    const isLoading = [isUpdateQuizLoading, isUpdateWithOptionsLoading].some(Boolean);
    const isError = [isUpdateQuizError, isUpdateWithOptionsError].some(Boolean);
    const isSuccess = [isUpdateQuizSuccess, isUpdateWithOptionsSuccess].some(Boolean);

    //effects
    useEffect(() => {
        if (!isQuizLoading && !isQuizError && quizInfo?.id) {
            const data = {
                video: quizInfo?.video_id,
                question: quizInfo?.question,
                options: quizInfo?.options,
            }
            setFormData(data)
        }
    }, [quizInfo, isQuizLoading, isQuizError])

    useEffect(() => {
        if (!isLoading && isSuccess) {
            setError("");
            resetForm();
            setSuccessMessage("Updated Successfully!");
            setMode(false);
        } else if (isError) {
            setError("Something wrong happend! Sorry for the issue.")
        }
    }, [isLoading, isError, isSuccess, setMode])

    //decide which page to show
    let content;
    switch (page) {
        case 0:
            content =
                <QuizInfo
                    formData={formData}
                    setFormData={setFormData}
                    videos={videos}
                    editMode={mode} />
            break
        case 1:
            content =
                <QuizOptions
                    formData={formData}
                    setFormData={setFormData}
                    editMode={mode} />
            break
        case 2:
            content =
                <Confirmation
                    formData={formData}
                    setFormData={setFormData}
                    editMode={mode} />
            break

        default:
            content = ""
            break
    }
    //handlers
    const resetForm = (e) => {
        setFormData({
            video: "",
            question: "",
            options: [
                { id: 1, option: "", isCorrect: false },
                { id: 2, option: "", isCorrect: false },
            ],
        })
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        if (formData.options.some(option => option.isCorrect === true)) {
            setError("");
            //prepare data object for passing to thunk
            const data = {
                question: formData.question,
                video_id: quizInfo?.video_id,
                video_title: quizInfo?.video_title,
                options: formData.options,
            }
            if (_.isEqual(formData?.options, quizInfo?.options)) {
                updateQuiz({ id, data });
            } else {
                // prefer if options change then delete quiz marks and notify user about it.
                updateQuizWithOptions({ id, data })
            }
        } else {
            setError("Choose any correct Answer!")
        }
    }
    const handlePrev = (e) => {
        e.preventDefault();
        setPage((prev) => (prev - 1) > 0 ? prev - 1 : 0);
    }
    const handleNext = (e) => {
        e.preventDefault();
        setPage((prev) => (prev + 1) > 2 ? 2 : prev + 1);
    }

    //decide content based on videos query
    let videoContent;
    if (isVideosLoading) {
        videoContent = <Modal setMode={setMode}>
            <Loading />
        </Modal>
    } else if (!isVideosLoading && isVideosError) {
        videoContent = <Error message={"There was an error in server side! Sorry for the issue."} />
    } else if (!isVideosLoading && !isVideosError && videos?.length === 0) {
        videoContent = <Error message={"No videos Found"} />
    }
    return (
        <div className='form-wrapper'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-sky-600'>Update Quiz</h2>
            <form className='px-6 md:px-14 space-y-6 form' onSubmit={handleUpdate}>
                <div className="rounded-md shadow-sm -space-y-px">
                    {content}

                    {/* all the buttons component */}
                    <div className="flex mt-8 justify-between">
                        <button
                            disabled={page === 0}
                            onClick={handlePrev}
                            type='button'
                            className='mt-2 mr-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'
                        >
                            Back
                        </button>
                        {page !== 2 ?
                            <button
                                disabled={page === 2 || isVideosError || isVideosLoading}
                                onClick={handleNext}
                                type='button'
                                className={` justify-center mt-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500`}
                            >
                                Next
                            </button>
                            :
                            <button
                                disabled={isLoading || page !== 2}
                                type='submit'
                                className={`inline-flex justify-center mt-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500`}
                            >
                                Update
                            </button>
                        }
                    </div>

                    {videoContent}
                    {successMessage !== "" && <Success message={successMessage} />}
                    {error !== "" && <Error message={error} />}
                </div>
            </form >
        </div >
    )
}

export default EditQuizzesForm