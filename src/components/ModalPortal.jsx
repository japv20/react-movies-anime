import { createPortal } from "react-dom";

export default function ModalPortal ({ children }) {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return null;
    
    return createPortal(children, modalRoot);
}
