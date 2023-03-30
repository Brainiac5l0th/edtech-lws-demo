import React from 'react';
import { useGetAssignmentsMarkQuery } from '../../../features/markAssignment/markAssignmentApi';

const MarkStatus = () => {
    const { data: assignmentMarks } = useGetAssignmentsMarkQuery();


    //filter all values for status
    const totalAssignments = assignmentMarks?.length || 0;
    const pendingCount = assignmentMarks?.filter(assignment => assignment.status === "pending").length || 0;
    const markSent = totalAssignments - pendingCount || 0;

    return (
        <ul className="assignment-status">
            <li>Total <span>{totalAssignments}</span></li>
            <li>Pending <span>{pendingCount}</span></li>
            <li>Mark Sent <span>{markSent}</span></li>
        </ul>
    )
}

export default MarkStatus