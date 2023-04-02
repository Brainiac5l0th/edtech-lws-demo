import React, { useState } from 'react';
import { useDeleteVideoMutation } from "../../../features/videos/videosApi";
import { formatString } from '../../../utils/formatting';
import { DeleteIcon, EditIcon } from '../../ui/admin/svg/CommonIcons';
import Modal from "../../ui/common/customModal/Modal";
import EditVideoForm from './EditVideoForm';
const VideosItem = ({ videoInfo }) => {

    const [deleteVideo] = useDeleteVideoMutation();

    const { id, title, description } = videoInfo || {};
    const [editMode, setEditMode] = useState(false)

    //filter
    const formatedTitle = formatString(title);
    const formatedDescription = formatString(description);

    //handlers
    const handleDelete = (e) => {
        deleteVideo(id);
    }
    const handleEdit = (e) => {
        setEditMode(true);
    }

    return (
        <>
            <tr>
                <td className="table-td">{formatedTitle}</td>
                <td className="table-td">{formatedDescription}</td>
                <td className="table-td flex gap-x-2">
                    <button onClick={handleDelete}>
                        {DeleteIcon}
                    </button>
                    <button onClick={handleEdit}>
                        {EditIcon}
                    </button>
                </td>
            </tr>
            {editMode &&
                <Modal mode={editMode} setMode={setEditMode}>
                    <EditVideoForm setMode={setEditMode} id={id} />
                </Modal>}
        </>
    )
}

export default VideosItem