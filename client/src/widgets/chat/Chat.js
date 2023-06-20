import React, {useEffect, useMemo, useState} from 'react'
/**
 * Придется писать хук для отправки и получения сообщений
 * */
// import Conversations from "../../pages/business_client/chat/Conversations";
import Conversations from "./Conversations";
// import Messenger from "../../pages/business_client/chat/Messenger";
import Messenger from "./Messenger";
import {useAppContext} from '../../context/AppContext';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import Logger from "../../internal/Logger";
import Block from "../../shared/ui/block/Block";
import Loader from "../../shared/ui/loader/Loader";

/**
 * Должен показывать компонент Conversations на desktop-e, на мобилке же нет.
 * */
export default function Chat({ activeConversationId='', openConversation=(id)=>{}, closeConversation=()=>{} }){
    const logger = useMemo(()=>new Logger('Chat'), []);

    const navigate = useNavigate();

    const { chatHandler } = useAppContext();

    const { conversations, chatLoading } = chatHandler;

    const conversation = conversations.find(conversation => conversation.id === activeConversationId);

    useEffect(()=>{
        if(activeConversationId && !conversation){
            // closeConversation();
            navigate('/404', {replace: true}); // обязательно с replace
        }
    },[activeConversationId])


    if(chatLoading){
        return (<>
            <Block isAlignCenter={true}><Loader color={'black'}/></Block>
        </>);
    }

    return (
        <>
            {!conversation &&
                <Conversations
                    openConversation={openConversation}
                />
            }
            {conversation &&
                <Messenger
                    conversation={conversation}
                    closeConversation={closeConversation}
                />
            }
        </>
    );
};
