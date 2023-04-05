import React from 'react';
import Error from '../../ui/common/Error';
import StudentResult from './StudentResult';

const TopResults = ({ finalResult }) => {
    let finalResultContent;

    if (finalResult.length === 0) {
        finalResultContent = <Error message='No partipants Yet!' />
    }
    else if (finalResult.length > 0) {
        finalResultContent =
            finalResult
                .filter(result => result.rank <= 20)
                .map((result) =>
                    <StudentResult key={result.id} info={result} />
                )
    }
    return (
        <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                <thead>
                    <tr className="border-b border-slate-600/50">
                        <th className="table-th !text-center">Rank</th>
                        <th className="table-th !text-center">Name</th>
                        <th className="table-th !text-center">Quiz Mark</th>
                        <th className="table-th !text-center">Assignment Mark</th>
                        <th className="table-th !text-center">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {finalResultContent}
                </tbody>
            </table>
        </div>
    )
}

export default TopResults