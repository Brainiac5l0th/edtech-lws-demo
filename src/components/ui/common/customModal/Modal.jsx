import { useEffect, useState } from "react";
import ModalBody from "./ModalBody";

const Modal = ({ mode, setMode, children }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(true);
    }, [])


    const closeModal = () => {
        setShowModal(false);
        setMode(!mode);
    }

    return showModal && <ModalBody closeModal={closeModal} > {children} </ModalBody >

}

export default Modal