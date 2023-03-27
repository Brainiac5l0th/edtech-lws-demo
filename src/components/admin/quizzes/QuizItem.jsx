import React from 'react'
import { DeleteIcon, EditIcon } from '../../ui/admin/svg/CommonIcons'

const QuizItem = () => {
    return (
        <tr>
            <td className="table-td">Quiz 1 - JavaScript Interview Questions</td>
            <td className="table-td">Debounce Function in JavaScript - JavaScript Job...</td>
            <td className="table-td flex gap-x-2 justify-center">
                {/* have to wrap them into a button component  */}
                {DeleteIcon}
                {EditIcon}
            </td>
        </tr>
    )
}

export default QuizItem