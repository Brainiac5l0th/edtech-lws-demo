import React from 'react';

const QuizDetails = ({ details }) => {
    const { video_title: title, mark, totalMark, totalQuiz } = details || {};
    const percentage = Math.round((mark / totalMark) * 100);

    const percentageClass = percentage >= 70 ? "text-teal-600" : "text-pink"
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">
                    Quizz: "{title}"
                </h1>
            </div>
            <table className='text-base w-full border border-slate-600/50 rounded-md my-4 '>
                <thead >
                    <tr className='border border-slate-600/50 bg-sky-950'>
                        <th className="table-th !text-center border-r">Total Quiz</th>
                        <th className="table-th !text-center">Mark Obtained</th>
                        <th className="table-th !text-center">Percentage</th>
                        <th className="table-th !text-center">Total Mark</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <th className="table-td table-td-repo text-center font-bold">{totalQuiz}</th>
                        <th className={`table-td text-center font-bold`}>{mark}</th>
                        <th className={`table-td text-center font-bold ${percentageClass}`}>{percentage}%</th>
                        <th className="table-td text-center font-bold">{totalMark}</th>
                    </tr>
                </tbody>
                <tbody></tbody>
            </table>
        </>
    )
}

export default QuizDetails