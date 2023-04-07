import React from 'react';
import { findSuitableId } from '../../../../utils/formatting';
import Error from '../../../ui/common/Error';
import TextInput from '../../../ui/common/formInputs/TextInput';

const QuizOptions = ({ formData, setFormData, editMode = false }) => {
    const handleClick = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            options: [
                ...prevState.options,
                { id: findSuitableId(prevState.options), option: "", isCorrect: false }
            ]
        }))
    }
    const handleChange = (e, i) => {
        const { name, value } = e.target;
        const newOptions = [...formData.options];
        const option = { ...newOptions[i], [name]: value };
        newOptions[i] = option;
        setFormData(prevState => ({
            ...prevState,
            options: newOptions
        }));
    }
    // const handleChange = (e, i) => {

    //   };


    let content;
    if (formData.question === "" || formData.video === "") {
        content = <div><Error message='Invalid input. check previous page.' /></div>
    } else {
        content = <div>
            <div className='flex justify-between'>
                <div>
                    <label className='mt-4 text-md font-medium text-sky-600'>{formData.question}</label>
                    <p className="text-sm text-gray-300 after:content-['*'] after:text-pink-600 after:mx-1">maximum six(6) options allowed</p>

                </div>
                {!editMode &&
                    <button
                        disabled={formData.options?.length === 6}
                        type="button"
                        onClick={handleClick}
                        className='mt-4 mr-2 py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500'>
                        Add Option
                    </button>}
                {editMode &&
                    <p className="text-sm text-pink after:mx-1">It is better to <span className='font-bold'>DELETE</span> quiz than changing options.</p>}
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
    }
    return content;
}

export default QuizOptions