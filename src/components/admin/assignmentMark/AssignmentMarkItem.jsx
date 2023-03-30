import React, { useState } from 'react';
import { useUpdateAssignmentMarkMutation } from '../../../features/markAssignment/markAssignmentApi';
import { formateDate, formatString } from "../../../utils/formatting";

const AssignmentMarkItem = ({ markInfo }) => {
    const { id, title, repo_link, createdAt, status, student_name, mark, totalMark } = markInfo || {};
    const [assignmentMark, setAssignmentMark] = useState(mark);
    const [updateAssignmentMark, { isLoading }] = useUpdateAssignmentMarkMutation();


    const formatedTitle = formatString(title);
    const formatedDate = formateDate(createdAt, true);
    //handlers
    const handleChange = (e) => {
        setAssignmentMark(e.target.value)
    }
    const handleUpdateMark = (e) => {
        const data = {
            status: "published",
            mark: Number(assignmentMark),
        }
        updateAssignmentMark({ id, data })

    }
    //class modify
    const markClass = status === "pending" ? "input-mark" : ""

    //content modify
    const markContent = status === "pending" ?
        <>
            <input max={totalMark} value={assignmentMark} onChange={handleChange} />
            <button disabled={isLoading} onClick={handleUpdateMark}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                    className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </button>
        </>
        :
        <>
            {mark}
        </>

    return (
        <>
            <tr>
                <td className="table-td">{formatedTitle}</td>
                <td className="table-td">{formatedDate}</td>
                <td className="table-td">{student_name}</td>
                <td className="table-td">{repo_link}</td>
                <td className={`table-td ${markClass}`}>{markContent}</td>
            </tr>
        </>
    )
}

export default AssignmentMarkItem