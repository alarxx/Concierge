import React, {useEffect, useState} from 'react'
/**
 * Придется писать хук для отправки и получения сообщений
 * */
import Conversations from "./Conversations";
import Messanger from "./Messanger";
import {useAppContext} from "../../context/AppContext";


/**
 * Должен грузить
 * */
export default function ChatApp(){
    const {socketHandler} = useAppContext()

    return (
        <>
            {/*{!isChatOpen && <Conversations conversations={conversationsDefault} openChat={openChat}/>}*/}
            {/*{isChatOpen && <Messanger user={user} messages={messages} setMessages={setMessages} closeChat={closeChat}/>}*/}
        </>
    );
};