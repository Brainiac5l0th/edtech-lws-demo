import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuizAnswer } from '../../../features/quizzes/quizSlice';

const QuizEl = ({ quizInfo }) => {
    const { id, options, question, } = quizInfo || {};
    const dispatch = useDispatch();
    const handleChange = (e, optId) => {
        dispatch(updateQuizAnswer({ quesId: id, optId, value: e.target.checked }));
    }

    //options
    const optionContent = options?.length >= 2 && options.map(option =>
        <label htmlFor={`option${option.id}_q${id}`} key={option.id} >
            <input
                type="checkbox"
                id={`option${option.id}_q${id}`}
                checked={option.checked}
                onChange={(e) => handleChange(e, option.id)} />
            {option.option}
        </label >
    )
    return (
        <div className="quiz">
            <h4 className="question">{`Question - ${question}`}</h4>
            <form className="quizOptions">
                {optionContent}
            </form>
        </div>
    )
}

export default QuizEl