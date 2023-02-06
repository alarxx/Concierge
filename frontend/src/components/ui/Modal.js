import React from "react";

export default function Modal({ children, id, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
}