import React from 'react';
import { useSelector } from 'react-redux';

const StudentResult = ({ info }) => {
    const { user: loggedInUser } = useSelector(state => state.auth) || {};
    const { id, assignmentMark, name, rank, total, totalQuizMark } = info || {};

    // css styling
    const content = id === loggedInUser.id ?
        (<tr className="border-2 border-cyan">
            <td className="table-td text-center font-bold">{rank}</td>
            <td className="table-td text-center font-bold">{name}</td>
            <td className="table-td text-center font-bold">{totalQuizMark}</td>
            <td className="table-td text-center font-bold">{assignmentMark}</td>
            <td className="table-td text-center font-bold">{total}</td>
        </tr>)
        :
        (<tr className="border-b border-slate-600/50">
            <td className="table-td text-center">{rank}</td>
            <td className="table-td text-center">{name}</td>
            <td className="table-td text-center">{totalQuizMark}</td>
            <td className="table-td text-center">{assignmentMark}</td>
            <td className="table-td text-center">{total}</td>
        </tr>)
    return content;
}

export default StudentResult