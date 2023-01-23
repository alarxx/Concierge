import React, {useEffect, useState} from 'react'
/**
 * Придется писать хук для отправки и получения сообщений
 * */
import Conversations from "./Conversations";
import Messanger from "./Messanger";
import {useAppContext} from "../../context/AppContext";
import {useNavigate, useParams} from "react-router-dom";

function log(...str){
    console.log("ChatApp\n", ...str);
}

/**
 * Должен показывать компонент Conversations на desktop-e, на мобилке же нет.
 * */
export default function ChatApp(){
    const navigate = useNavigate();

    const {chatHandler, authHandler} = useAppContext()

    const { id } = useParams()

    const [conversation, setConversation] = useState()

    const {messages, conversations, sendMessage} = chatHandler;
    const {user} = authHandler;

    // Нужны ли эти методы здесь? Вроде нет
    function openConversation(conversation){
        // Мы должны проверить состоит ли пользователь в этом conversation
        navigate(`/chat/${conversation.id}`)
    }
    function closeConversation(){
        navigate(-1)
    }

    useEffect(()=>{
        const c = conversations.find(conversation => conversation.id === id);
        setConversation(c)
    }, [id]);

    return (
        <>
            {!conversation &&
                <Conversations
                    conversations={conversations}
                    openConversation={openConversation}
                />
            }

            {conversation &&
                <Messanger
                    conversation={conversation}
                    user={user}
                    messages={messages}
                    sendMessage={sendMessage}
                    closeConversation={closeConversation}
                />
            }
        </>
    );
};