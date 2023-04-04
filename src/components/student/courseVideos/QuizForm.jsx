import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import QuizEl from './QuizEl';

const QuizForm = ({ title }) => {
    const [page, setPage] = useState(0)

    const { quizzes } = useSelector(state => state.quiz)

    //handlers
    const handleSubmit = (e) => {
        //calculate the result and update the quiz mark
    }
    //css   
    const disableBtnClass = "cursor-not-allowed bg-cyan-700";
    const normalBtnClass = "bg-cyan hover:opacity-90 active:opacity-100 active:scale-95"
    //quiz content
    const quizContent = quizzes?.length > 0 && <QuizEl quizInfo={quizzes[page]} />
    return (
        <section className=" bg-primary rounded-md">
            <div className='p-4 md:p-8'>
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
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
                            </button>}


                    </div>
                </div>
            </div>
        </section>
    )
}

export default QuizForm