import React from 'react';
import { formatString } from '../../../utils/formatting';
import { DeleteIcon, EditIcon } from '../../ui/admin/svg/CommonIcons';

const QuizItem = ({ quizInfo }) => {
    const { question, video_title } = quizInfo || {};

    //formating titles
    const formatQuestion = formatString(question);
    const formatVideoTitle = formatString(video_title);


    //handlers
    const handleDelete = (e) => {

    }
    const handleEdit = (e) => {

    }
    return (
        <tr>
            <td className="table-td">{formatQuestion}</td>
            <td className="table-td">{formatVideoTitle}</td>
            <td className="table-td flex gap-x-2 justify-center">
                <button onClick={handleDelete}>
                    {DeleteIcon}
                </button>
                <button onClick={handleEdit}>
                    {EditIcon}
                </button>
            </td>
        </tr>
    )
}

export default QuizItem