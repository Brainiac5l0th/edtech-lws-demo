import { useEffect } from "react"
import { createPortal } from "react-dom"

const ModalBody = ({ closeModal, children }) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden"

        return () => {
            document.body.style.overflowY = "scroll"
        }
    }, [])


    //content
    const content =
        (<>
            <div className="modal-wrapper" onClick={closeModal}></div>
            <div className="modal-container">
                {children}
            </div>
        </>)

    return createPortal(
        content,
        document.getElementById("modal")
    )
}

export default ModalBody