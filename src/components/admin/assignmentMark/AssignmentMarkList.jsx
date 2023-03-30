import React from 'react';
import { useGetAssignmentsMarkQuery } from '../../../features/markAssignment/markAssignmentApi';
import Error from '../../ui/common/Error';
import Loading from '../../ui/common/Loading';
import AssignmentMarkItem from './AssignmentMarkItem';

const AssignmentMarkList = () => {
    const { data: assignmentMarks, isLoading, isError } = useGetAssignmentsMarkQuery();
    
    //decide what to render 
    let content;
    if (isLoading) content = <Loading />
    else if (!isLoading && isError) content = <Error />
    else if (!isLoading && !isError && assignmentMarks.length === 0) content = <Error message='No Marks Found' />
    else if (!isLoading && !isError && assignmentMarks.length > 0) {
        content = <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
                <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">
                {assignmentMarks?.map((assignmentMark, i) => <AssignmentMarkItem key={i} markInfo={assignmentMark} />)}
            </tbody>
        </table>
    }
    return (
        <div className="overflow-x-auto mt-4">
            {content}
        </div>
    )
}

export default AssignmentMarkList