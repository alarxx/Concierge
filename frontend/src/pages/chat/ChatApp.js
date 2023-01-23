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
    const [conversationMessages, setConversationMessages] = useState([])

    const {messages, conversations, notifications, sendMessage, deleteNotifications} = chatHandler;
    const {user} = authHandler;

    function openConversation(conversation){
        // Мы должны проверить состоит ли пользователь в этом conversation
        navigate(`/chat/${conversation.id}`)
    }
    function closeConversation(){
        navigate(-1)
    }

    useEffect(()=>{
        if(id){
            const c = conversations.find(conversation => conversation.id === id);
            setConversation(c)
            setConversationMessages(messages.filter(m => m.conversation == c.id))
        }
        else {
            setConversation(null)
            setConversationMessages([])
        }

    }, [id]);

    useEffect(()=>{
        if(conversation){
            setConversationMessages(messages.filter(m => m.conversation == conversation.id))
        }
    }, [messages]);

    useEffect(()=>{
        if(conversation){
            deleteNotifications(conversationMessages);
        }
    })

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
                    messages={conversationMessages}
                    sendMessage={sendMessage}
                    closeConversation={closeConversation}
                />
            }
        </>
    );
};