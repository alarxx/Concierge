import React, {useState} from 'react'

import CloseIcon from "../../assets/icons/close.svg";

export default function AttachPanel({title, onClose=f=>f, children}){

    return (
        <div className="chat__controlpanel">
            <div className="chat-controls-attach">
                <div className="chat-controls-attach__close" onClick={onClose}>
                    <CloseIcon />
                </div>
                <div className="chat-controls-attach__title">
                    {title} 
                </div>
                {children}
            </div>
        </div>
    );
}