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
export default function Chat({ activeConversationId='', openConversation=f=>f, closeConversation=f=>f }){
    const logger = useMemo(()=>new Logger('Chat'), []);

    const { chatHandler, authHandler } = useAppContext();

    const { messages, conversations, notifications, sendMessage, deleteNotifications, _upsertMessage, chatLoading } = chatHandler;
    const { user } = authHandler;

    const [conversation, setConversation] = useState();

    const [conversationMessages, setConversationMessages] = useState([]);

    useEffect(()=>{
        if(activeConversationId){
            deleteNotifications(conversationMessages);
        }
    }, [activeConversationId, messages]);

    useEffect(()=>{
        if(activeConversationId){
            setConversation(conversations.find(conversation => conversation.id === activeConversationId));
            setConversationMessages(messages.filter(m => m.conversation === activeConversationId));
        }
        else {
            setConversation(null);
            setConversationMessages([]);
        }
    }, [activeConversationId, messages]);

    useEffect(()=>{
        logger.log({conversation})
    }, [conversation, messages])

    return (
        <>
            {!activeConversationId &&
                <Conversations
                    chatLoading={chatLoading}
                    conversations={conversations}
                    notifications={notifications}
                    messages={messages}
                    openConversation={openConversation}
                />
            }

            {activeConversationId &&
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
