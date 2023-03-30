import React from 'react';
import { formatString } from '../../../utils/formatting';
import { DeleteIcon, EditIcon } from '../../ui/admin/svg/CommonIcons';
const AssignmentItem = ({ assignmentInfo }) => {

    const { title, totalMark, video_title } = assignmentInfo || {};

    // format
    const formatAssignmentTitle = formatString(title);
    const formatVideoTitle = formatString(video_title);


    //handlers
    //handlers
    const handleDelete = (e) => {

    }
    const handleEdit = (e) => {

    }
    return (
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
    )
}

export default AssignmentItem