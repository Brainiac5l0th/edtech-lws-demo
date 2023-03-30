import React from 'react';
import { formatString } from '../../../utils/formatting';
import { DeleteIcon, EditIcon } from '../../ui/admin/svg/CommonIcons';

const VideosItem = ({ videoInfo }) => {
    const { id, title, description } = videoInfo || {};
    const formatedTitle = formatString(title);
    const formatedDescription = formatString(description);

    const handleDelete = (e) => {
        console.log(`i will delete`, id);
    }
    const handleEdit = (e) => {
        console.log(`i will Edit`, id);
    }

    return (
        <tr>
            <td className="table-td">{formatedTitle}</td>
            <td className="table-td">{formatedDescription}</td>
            <td className="table-td flex gap-x-2">
                {/* //have to wrap them in button element */}
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

export default VideosItem