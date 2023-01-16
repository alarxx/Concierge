import React, {useEffect, useLayoutEffect, useRef} from 'react'
import NewButton from "./NewButton";
import Chats from "../chat/Chats";
import ArchiveLink from "../chat/ArchiveLink";

export default function Container({chat=false, children }){
    /*const chatList = useRef(null);

    useLayoutEffect(() => {
        if(chat) {
            chatList.current.scrollTop = chatList.current.scrollHeight;
        }
    });*/

    return (
        <div className="container">
            {/*ref={chat?chatList:null}*/}
            <div className={`phone_workspace ${chat?'chat_workflow':''}`} >
                {children}
            </div>

        </div>
    );
}