import React, { useEffect } from 'react';
import { AssignmentMarkList, MarkStatus } from '../../components/admin';

const AssignmentMark = () => {
    //effects
    useEffect(() => {
        document.title = "Assignment Mark"
    }, [])
    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-full px-5 lg:px-20">
                <div className="px-3 py-20 bg-opacity-10">
                    <MarkStatus />
                    <AssignmentMarkList />
                </div>
            </div>
        </section>
    )
}

export default AssignmentMark