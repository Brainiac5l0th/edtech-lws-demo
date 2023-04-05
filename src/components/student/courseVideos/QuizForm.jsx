import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    useAddQuizMarkMutation,
    useGetQuizMarkWithStudentIdQuery
} from '../../../features/quizMark/quizMarkApi';
import quizCalculator from '../../../utils/quiz/calculator';
import Error from '../../ui/common/Error';
import Loading from '../../ui/common/Loading';
import QuizDetails from './QuizDetails';
import QuizEl from "./QuizEl";


const QuizForm = ({ title, setMode, isLoading: isQuizLoading, isError: isQuizError }) => {
    const [page, setPage] = useState(0)
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const { quizzes } = useSelector(state => state.quiz);
    const { user: loggedInUser } = useSelector(state => state.auth)
    const { video_id, video_title } = quizzes[0];
    //thunks
    const [
        addQuizMark,
        {
            isError,
            isSuccess
        }
    ] = useAddQuizMarkMutation();
    //to check whether the student has given the quiz already
    const {
        data: hasGivenQuiz,
        isLoading: isGivenQuizLoading,
        isError: isGivenQuizError } =
        useGetQuizMarkWithStudentIdQuery({ videoId: video_id, student_id: loggedInUser.id })

    //effects
    useEffect(() => {
        if (isSuccess) {
            setMode(false);
            navigate('/leaderboard');
        } else if (isError) {
            setError("There is something wrong submitting Quiz!")
        }
    }, [isSuccess, setMode, navigate, isError])

    //handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        //calculate the result and update the quiz mark
        const confirmation = window.confirm("Are you sure you want to submit?")
        if (confirmation) {
            const result = quizCalculator(quizzes);
            const { correct_answer, wrong_answer, total_quiz, total_mark, mark } = result || {};
            const data = {
                student_id: loggedInUser.id,
                student_name: loggedInUser.name,
                video_id,
                video_title,
                totalQuiz: total_quiz,
                totalCorrect: correct_answer,
                totalWrong: wrong_answer,
                totalMark: total_mark,
                mark
            }
            addQuizMark(data);

        }
    }

    //css   
    const disableBtnClass = "cursor-not-allowed bg-cyan-700";
    const normalBtnClass = "bg-cyan hover:opacity-90 active:opacity-100 active:scale-95"
    //quiz content
    let quizContent;
    if (isQuizLoading) quizContent = <Loading />
    else if (!isQuizLoading && isQuizError) quizContent = <Error message='There was an error occured!' />
    else if (quizzes?.length > 0) {
        quizContent = <QuizEl quizInfo={quizzes[page]} />
    }

    //check if the user has given the quiz already
    let mainContent;
    if (isGivenQuizLoading) {
        mainContent = <Loading />
    } else if (!isGivenQuizLoading && isGivenQuizError) {
        mainContent = <Error message='An error Occured!' />
    } else if (!isGivenQuizLoading && !isGivenQuizError && hasGivenQuiz?.length === 0) {
        mainContent = <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Quizzes for "{title}"
                </h1>
                <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
            </div>
            <div className="space-y-8 ">
                {quizContent}
            </div>

            {/* //buttons  */}
            <div className="flex mt-8 justify-between">
                {page - 1 >= 0 ? <button
                    disabled={page === 0}
                    onClick={() => setPage(prev => prev - 1)}
                    className={`justify-start px-4 py-2 rounded-full  ${page === 0 ? disableBtnClass : normalBtnClass} `}>
                    Previous
                </button> : <span></span>}

                {page !== quizzes?.length - 1 ?
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        className={`justify-end px-4 py-2 rounded-full hover:opacity-90 active:opacity-100 active:scale-95 ${page === quizzes?.length - 1 ? disableBtnClass : normalBtnClass}`}>
                        Next
                    </button>
                    :
                    <button
                        onClick={handleSubmit}
                        className="justify-end px-4 py-2 rounded-full bg-cyan hover:opacity-90 active:opacity-100 active:scale-95 ">
                        Submit
                    </button>
                }

            </div>
        </>
    } else if (!isGivenQuizLoading && !isGivenQuizError && hasGivenQuiz?.length > 0) {
        mainContent = <QuizDetails details={hasGivenQuiz[0]} />
    }
    return (
        <section className="bg-primary rounded-md">
            <div className='p-4 md:p-8'>
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    {mainContent}
                </div>
            </div>
            {error !== "" && <Error message={error} />}
        </section>
    )
}

export default QuizForm