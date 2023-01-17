import React, {useState} from 'react'

import CloseIcon from "../../icons/close.svg";

export default function AttachPanel({title, children}){

    return (
        <div className="chat__controlpanel">
            <div className="chat-controls-attach">
                <div className="chat-controls-attach__close">
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