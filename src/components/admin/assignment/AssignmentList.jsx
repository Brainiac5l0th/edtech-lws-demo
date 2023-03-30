import React from 'react'
import { useGetAssignmentsQuery } from "../../../features/assignment/assignmentApi"
import Error from "../../ui/common/Error"
import Loading from "../../ui/common/Loading"
import AssignmentItem from './AssignmentItem'
const AssignmentList = () => {
    const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();

    //decide what to render 
    let content;
    if (isLoading) content = <Loading />
    else if (!isLoading && isError) content = <Error />
    else if (!isLoading && !isError && assignments.length === 0) content = <Error message='No assignments Found' />
    else if (!isLoading && !isError && assignments.length > 0) {
        content = <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
                <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Action</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">
                {assignments?.map(assignment => <AssignmentItem key={assignment.id} assignmentInfo={assignment} />)}
            </tbody>
        </table>
    }
    return (
        <div className="overflow-x-auto mt-4">
            {content}
        </div>
    )
}

export default AssignmentList