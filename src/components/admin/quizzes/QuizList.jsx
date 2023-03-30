import React from 'react';
import { useGetQuizzesQuery } from '../../../features/quizzes/quizzesApi';
import Error from '../../ui/common/Error';
import Loading from '../../ui/common/Loading';
import QuizItem from './QuizItem';

const QuizList = () => {
    const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();

    //decide what to render 
    let content;
    if (isLoading) content = <Loading />
    else if (!isLoading && isError) content = <Error />
    else if (!isLoading && !isError && quizzes.length === 0) content = <Error message='No quizzes Found' />
    else if (!isLoading && !isError && quizzes.length > 0) {
        content = <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
                <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">
                {quizzes?.map(quiz => <QuizItem key={quiz.id} quizInfo={quiz} />)}
            </tbody>
        </table>
    }
    return (
        <div className="overflow-x-auto mt-4">
            {content}
        </div>
    )
}

export default QuizList