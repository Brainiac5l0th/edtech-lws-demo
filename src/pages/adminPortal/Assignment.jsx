import React, { useState } from 'react';
import { AssignmentList } from '../../components/admin';
import AddAssignmentForm from '../../components/admin/assignment/AddAssignmentForm';
import Modal from '../../components/ui/common/customModal/Modal';

const Assignment = () => {
    const [addMode, setAddMode] = useState(false);
    const handleAdd = () => {
        setAddMode(true);
    }
    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-full px-5 lg:px-20">
                <div className="px-3 py-20 bg-opacity-10">
                    <div className="w-full flex">
                        <button className="btn ml-auto" onClick={handleAdd}>Add Assignment</button>
                    </div>
                    <AssignmentList />
                </div>
            </div>
            {addMode
                &&
                <Modal mode={addMode} setMode={setAddMode}>
                    <AddAssignmentForm setMode={setAddMode} />
                </Modal>}
        </section>
    )
}

export default Assignment