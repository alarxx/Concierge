import React, {useEffect, useLayoutEffect, useRef} from 'react'

export default function Workspace({chat=false, children }){
    const chatList = useRef(null);

    /*useEffect(() => {
        if(chat) {
            // chatList.current.scrollIntoView({
            //     top: document.body.scrollHeight,
            //     behavior: 'smooth'
            // });
            // console.log("Workspace TOP HEIGHT", chatList.current.scrollTop, chatList.current.scrollHeight);
            // chatList.current.scrollTop = 7000//chatList.current.scrollHeight;
            // chatList.current.scrollToBottom()

            // window.scrollTo({
            //     top: document.body.scrollHeight,
            //     behavior: "smooth"
            // });

            // chatList.current.scrollToEnd({ animated: true });
        }
    });

    useLayoutEffect(() => {
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