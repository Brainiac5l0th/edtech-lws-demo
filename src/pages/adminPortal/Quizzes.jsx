import React, { useEffect, useState } from 'react';
import { QuizList } from '../../components/admin';
import AddQuizzesForm from '../../components/admin/quizzes/AddQuizzesForm';
import Modal from '../../components/ui/common/customModal/Modal';

const Quizzes = () => {
    const [addMode, setAddMode] = useState(false);
    const handleAdd = () => {
        setAddMode(true);
    }
    //effects
    useEffect(() => {
        document.title = "Quizzes"
    }, [])
    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-full px-5 lg:px-20">
                <div className="px-3 py-20 bg-opacity-10">
                    <div className="w-full flex">
                        <button className="btn ml-auto" onClick={handleAdd}>Add Quiz</button>
                    </div>
                    <QuizList />
                </div>
            </div>
            {addMode
                &&
                <Modal mode={addMode} setMode={setAddMode}>
                    <AddQuizzesForm setMode={setAddMode} />
                </Modal>}
        </section>
    )
}

export default Quizzes