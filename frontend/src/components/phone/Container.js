import React from 'react'
import NewButton from "./NewButton";
import Chats from "../chat/Chats";
import ArchiveLink from "../chat/ArchiveLink";

export default function Container({chat=false, children }){
    return (
        <div className="container">

            <div className={`phone_workspace ${chat?'chat_workflow':''}`}>
                {children}
            </div>

        </div>
    );
}