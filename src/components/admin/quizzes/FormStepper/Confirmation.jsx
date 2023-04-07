import React from 'react';
import Error from '../../../ui/common/Error';

const Confirmation = ({ formData, setFormData }) => {

    const handleChange = (e, id) => {
        const { checked } = e.target;
        const newOptions = formData.options.map(option => {
            if (option.id === id) {
                return { ...option, "isCorrect": checked };
            }
            return option;
        });
        setFormData(prevState => ({
            ...prevState,
            options: newOptions
        }));
    }
    //selected content
    const selectedOptions = formData?.options?.map(option =>
        <label htmlFor={`option ${option.id}`} key={option.id}>
            <input
                type="checkbox"
                id={`option ${option.id}`}
                checked={option.isCorrect}
                onChange={(e) => handleChange(e, option.id)}
            />
            {option.option}
        </label >)

    //content decide
    let content;
    if (formData.options.some(option => option.option === "")) {
        content = <Error message='Options Can not be blank. Please add option value in previous page!' />
    } else {
        content = <div className="space-y-8 ">
            <div className="quizOptions">
                {selectedOptions}
            </div>
        </div>
    }
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Quiz <span className='text-sky-600'>Question: </span>{formData.question}
                </h1>
                <p className="text-sm text-gray-300 after:content-['*'] after:text-pink-600 after:mx-1"> Choose the correct answer/answers among the following options</p>
            </div>
            {content}
        </>
    )
}

export default Confirmation