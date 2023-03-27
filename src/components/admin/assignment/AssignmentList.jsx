import React from 'react'
import AssignmentItem from './AssignmentItem'

const AssignmentList = () => {
    return (
        <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                    <tr>
                        <th className="table-th">Title</th>
                        <th className="table-th">Video Title</th>
                        <th className="table-th">Mark</th>
                        <th className="table-th">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                    <AssignmentItem />
                    <AssignmentItem />
                    <AssignmentItem />
                    <AssignmentItem />
                    <AssignmentItem />
                </tbody>
            </table>
        </div>
    )
}

export default AssignmentList