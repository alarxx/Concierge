import React, {useEffect, useLayoutEffect, useRef} from 'react'

export default function Container({chat=false, children }){
    /*const chatList = useRef(null);

    useLayoutEffect(() => {
        if(chat) {
            chatList.current.scrollTop = chatList.current.scrollHeight;
        }
    });*/

    return (
        <div className={`phone_workspace ${chat?'chat_workflow':''}`}>
            {/*ref={chat?chatList:null}*/}
            <div className="container" >
                {children}
            </div>

        </div>
    );
}