import React, { useState } from 'react';
import { formatString } from '../../../utils/formatting';
import { DeleteIcon, EditIcon } from '../../ui/admin/svg/CommonIcons';
import Modal from '../../ui/common/customModal/Modal';
import EditQuizzesForm from './EditQuizzesForm';

const QuizItem = ({ quizInfo }) => {

    const { id, question, video_title } = quizInfo || {};
    const [editMode, setEditMode] = useState(false);
    //formating titles
    const formatQuestion = formatString(question);
    const formatVideoTitle = formatString(video_title);

    //handlers
    const handleDelete = (e) => {

    }
    const handleEdit = (e) => {
        setEditMode(true);
    }
    return (
        <>
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
            {
                editMode &&
                <Modal mode={editMode} setMode={setEditMode}>
                    <EditQuizzesForm setMode={setEditMode} mode={editMode} id={id} />
                </Modal>
            }
        </>
    )
}

export default QuizItem