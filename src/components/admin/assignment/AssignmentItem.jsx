import React, { useState } from 'react';
import { useDeleteAssignmentMutation } from '../../../features/assignment/assignmentApi';
import { formatString } from '../../../utils/formatting';
import { DeleteIcon, EditIcon } from '../../ui/admin/svg/CommonIcons';
import Modal from '../../ui/common/customModal/Modal';
import EditAssignmentForm from './EditAssignmentForm';
const AssignmentItem = ({ assignmentInfo }) => {

    const { id, title, totalMark, video_title } = assignmentInfo || {};
    const [editMode, setEditMode] = useState(false);

    //thunks
    const [deleteAssignment] = useDeleteAssignmentMutation()
    // format
    const formatAssignmentTitle = formatString(title);
    const formatVideoTitle = formatString(video_title);


    //handlers
    const handleDelete = (e) => {
        deleteAssignment(id);
    }
    const handleEdit = (e) => {
        setEditMode(true);
    }
    return (<>
        <tr>
            <td className="table-td">{formatAssignmentTitle}</td>
            <td className="table-td">{formatVideoTitle}</td>
            <td className="table-td">{totalMark}</td>
            <td className="table-td flex gap-x-2">
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
                <EditAssignmentForm setMode={setEditMode} id={id} />
            </Modal>
        }
    </>
    )
}

export default AssignmentItem