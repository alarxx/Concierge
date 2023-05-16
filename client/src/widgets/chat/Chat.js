import React, {useEffect, useMemo, useState} from 'react'
/**
 * Придется писать хук для отправки и получения сообщений
 * */
// import Conversations from "../../pages/business_client/chat/Conversations";
import Conversations from "./Conversations";
import Messenger from "../../pages/business_client/chat/Messenger";
import {useAppContext} from '../../context/AppContext';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import Logger from "../../internal/Logger";
import Block from "../../shared/ui/block/Block";
import Loader from "../../shared/ui/loader/Loader";

/**
 * Должен показывать компонент Conversations на desktop-e, на мобилке же нет.
 * */
export default function Chat({ activeConversationId='', openConversation=f=>f, closeConversation=f=>f }){
    const logger = useMemo(()=>new Logger('Chat'), []);

    const { chatHandler, authHandler } = useAppContext();

    const { messages, conversations, notifications, sendMessage, deleteNotifications, _upsertMessage, chatLoading } = chatHandler;
    const { user } = authHandler;

    const conversation = conversations.find(conversation => conversation.id === activeConversationId);

    const conversationMessages = messages.filter(m => m.conversation === activeConversationId);

    useEffect(()=>{
        if(activeConversationId && !conversation){
            logger.log("closeConversation");
            closeConversation();
        }
    },[activeConversationId])

    useEffect(()=>{
        if(activeConversationId){
            deleteNotifications(conversationMessages);
        }
    }, [activeConversationId, messages]);


    if(chatLoading){
        return (<>
            <Block isAlignCenter={true}><Loader color={'black'}/></Block>
        </>);
    }

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
