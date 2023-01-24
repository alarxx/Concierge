import React, {useEffect, useLayoutEffect, useRef} from 'react'

export default function Container({chat=false, children }){
    const chatList = useRef(null);

    /*useLayoutEffect(() => {
        if(chat) {
            if(chatList.current)
                chatList.current.scrollTop = chatList.current.scrollHeight;
        }
    });*/

    /*useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);*/

    return (
        <div className={`phone_workspace ${chat?'chat_workflow':''}`}>
            {/**/}
            <div className="container" ref={chat?chatList:null}>
                {children}
            </div>

        </div>
    );
}