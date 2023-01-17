import React, {useEffect, useState} from 'react'
/**
 * Придется писать хук для отправки и получения сообщений
 * */
import Conversations from "./Conversations";
import Messanger from "./Messanger";
import {useAppContext} from "../../context/AppContext";
import {useParams} from "react-router-dom";

/**
 * Должен показывать компонент Conversations на desktop-e, на мобилке же нет.
 * */
export default function ChatApp(){
    const {chatHandler, authHandler} = useAppContext()

    const { conversation } = useParams()

    const {messages, setMessages, conversations, openConversation, closeConversation} = chatHandler;
    const {user} = authHandler;

    return (
        <>
            {!conversation && <Conversations conversations={conversations} openConversation={openConversation}/>}
            {conversation && <Messanger user={user} messages={messages} setMessages={setMessages} closeConversation={closeConversation}/>}
        </>
    );
};