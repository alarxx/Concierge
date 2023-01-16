import React, {useEffect, useLayoutEffect, useRef} from 'react'
import NewButton from "./NewButton";
import Chats from "../chat/Chats";
import ArchiveLink from "../chat/ArchiveLink";

export default function Container({chat=false, children }){
    const chatList = useRef(null);

    useLayoutEffect(() => {
        console.log(chatList)
        if(chat) {
            console.log(chatList.current.scrollTop, chatList.current.scrollHeight);
            chatList.current.scrollTop = chatList.current.scrollHeight;//chatList.current.scrollHeight;
            console.log(chatList.current.scrollTop, chatList.current.scrollHeight);
        }

    });

    return (
        <div className="container">

            <div ref={chat?chatList:null} className={`phone_workspace ${chat?'chat_workflow':''}`} >
                {children}
            </div>

        </div>
    );
}