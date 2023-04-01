import React, { useState } from 'react';
import { VideosList } from '../../components/admin';
import AddVideoForm from "../../components/admin/videos/AddVideoForm";
import Modal from "../../components/ui/common/customModal/Modal";


const Videos = () => {
    const [addMode, setAddMode] = useState(false);
    const handleAdd = () => {
        setAddMode(true);
    }
    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-full px-5 lg:px-20">
                <div className="px-3 py-20 bg-opacity-10">
                    <div className="w-full flex">
                        <button className="btn ml-auto" onClick={handleAdd}>Add Video</button>
                    </div>
                    <VideosList />
                </div>
            </div>
            {addMode
                &&
                <Modal mode={addMode} setMode={setAddMode}>
                    <AddVideoForm setMode={setAddMode} />
                </Modal>}
        </section>
    )
}

export default Videos