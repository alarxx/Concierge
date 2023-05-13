import React, {useEffect, useMemo, useState} from 'react'
/**
 * Придется писать хук для отправки и получения сообщений
 * */
import Conversations from "../../pages/business_client/chat/Conversations";
import Messenger from "../../pages/business_client/chat/Messenger";
import {useAppContext} from '../../context/AppContext';
import {useNavigate, useParams} from "react-router-dom";
import Logger from "../../internal/Logger";

/**
 * Должен показывать компонент Conversations на desktop-e, на мобилке же нет.
 * */
export default function Chat({onMessengerActive=f=>f}){
    const logger = useMemo(()=>new Logger('Chat'), []);

    const navigate = useNavigate();
    const { id } = useParams();

    const { chatHandler, authHandler } = useAppContext();

    const { messages, conversations, notifications, sendMessage, deleteNotifications, _upsertMessage, chatLoading } = chatHandler;
    const { user } = authHandler;

    const [conversation, setConversation] = useState();
    const [conversationMessages, setConversationMessages] = useState([]);

    function openConversation(conversation){
        // Мы должны проверить состоит ли пользователь в этом conversation
        navigate(`/chat/${conversation.id}`);
    }
    function closeConversation(){
        navigate(-1);
    }

    useEffect(()=>{
        if(id){
            setConversation(conversations.find(conversation => conversation.id === id));
            setConversationMessages(messages.filter(m => m.conversation === id));
            onMessengerActive(true)
        }
        else {
            setConversation(null);
            setConversationMessages([]);
            onMessengerActive(false)
        }

    }, [id]);

    useEffect(()=>{
        if(id){
            setConversationMessages(messages.filter(m => m.conversation === id));
        }
    }, [messages]);

    useEffect(()=>{
        if(id){
            deleteNotifications(conversationMessages);
        }
    }, [id, messages]);

    return (
        <>
            {!conversation &&
                <Conversations
                    chatLoading={chatLoading}
                    conversations={conversations}
                    notifications={notifications}
                    messages={messages}
                    openConversation={openConversation}
                />
            }

            {conversation &&
                <Messenger
                    conversation={conversation}
                    user={user}
                    messages={conversationMessages}
                    sendMessage={sendMessage}
                    closeConversation={closeConversation}
                    _upsertMessage={_upsertMessage}
                />
            }
        </>
    );
};
