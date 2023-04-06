import React from 'react';
import { findSuitableId } from '../../../../utils/formatting';
import TextInput from '../../../ui/common/formInputs/TextInput';

const QuizOptions = ({ formData, setFormData }) => {
    const handleClick = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            options: [
                ...prevState.options,
                { id: findSuitableId(prevState.options), option: "", isCorrect: false }
            ]
        }))
        // formData.options.append({ id: findSuitableId(formData.options), option: "", isCorrect: false })
    }
    const handleChange = (e, i) => {
        const { name, value } = e.target;
        const newOptions = [...formData.options];
        newOptions[i][name] = value;
        setFormData(prevState => ({
            ...prevState,
            options: newOptions
        }));
    }

    return (
        <div>
            <div className='flex justify-between'>
                <div>
                    <label className='mt-4 text-md font-medium text-sky-600'>{formData.question}</label>
                    <p className="text-sm text-gray-300 after:content-['*'] after:text-pink-600 after:mx-1">maximum six(6) options allowed</p>
                </div>
                <button
                    disabled={formData.options?.length === 6}
                    type="button"
                    onClick={handleClick}
                    className='mt-4 mr-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'>Add Option</button>
            </div>
            {formData.options?.map((option, i) =>
                <TextInput
                    key={option.id}
                    title={`option #${option.id}`}
                    name={"option"}
                    placeholder={`option #${option.id}`}
                    required
                    value={option.option}
                    onChange={(e) => handleChange(e, i)}
                />
            )}
        </div>
    )
}

export default QuizOptions