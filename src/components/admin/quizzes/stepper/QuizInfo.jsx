import React from 'react';
import TextInput from '../../../ui/common/formInputs/TextInput';

const QuizInfo = ({ formData, setFormData, videos }) => {



    //decide options for the quiz against available videos
    const videoOptions = videos && videos?.length > 0 &&
        videos?.map(video => <option key={video.id} value={video.id} >{video.title}</option>);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div>
                <label
                    htmlFor='videoTitle'
                    className='mt-4 block text-md font-medium text-sky-600' >
                    Videos
                </label>
                <select
                    disabled={videos?.length === 0}
                    id='videoTitle'
                    name="video"
                    className='mt-2 p-2 text-black focus:ring-sky-600 focus:border-sky-600 block w-full rounded-md shadow-sm text-sm bg-gray-300'
                    value={formData.video}
                    onChange={handleChange}
                    required>
                    <option value="" hidden className='text-sky-600'>Select Video</option>
                    {videoOptions}
                </select>
            </div>
            <TextInput
                title={"Quiz Title"}
                name="question"
                placeholder="title of the quiz"
                value={formData.question}
                onChange={handleChange}
                required />
        </>
    )
}

export default QuizInfo