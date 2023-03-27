import React from 'react'
import { DeleteIcon, EditIcon } from '../../ui/admin/svg/CommonIcons'

const VideosItem = () => {
    return (
        <tr>
            <td className="table-td">#4 React Prerequisites - React শিখতে কি কি জানা প্রয়োজন - React
                Tutorial Bangla Series</td>
            <td className="table-td">React Prerequisites - React শিখতে কি কি জানা প্রয়োজন...</td>
            <td className="table-td flex gap-x-2">
                {/* //have to wrap them in button element */}
                {DeleteIcon}
                {EditIcon}
            </td>
        </tr>
    )
}

export default VideosItem