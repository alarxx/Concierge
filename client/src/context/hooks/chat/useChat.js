import React, {useEffect, useMemo, useState} from 'react'

import useFreshData from "../useFreshData";
import Logger from "../../../internal/Logger";

/*const conversationsDefault = [
    {
        id: 1,
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:3
    },
    {
        id: 2,
        name:"Командировка2",
        last_message:"Сообщение сообщение",
        unread_num:2
    },
    {
        id: 3,
        name:"Командировка3",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        id: 4,
        name:"Командировка4 ",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
]
const hotelsDefault = [
    {
        service: 1,
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
        rate: "4.2"
    },
    {
        service: 2,
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
        rate: "4.2"
    },
    {
        service: 3,
        img_url: "/img/hotelimg.png",
        name: "Название",
        description: "Описание описание описание описание описание",
        price: "10 000",
        address: "Адрес",
        rate: "4.2"
    }
]
const messagesDefault = [
    {
        type: 'form',
        id: '103',
        items: hotelsDefault,
        selected: [1],
        submitted: true,
        sender: '1',
        multiple_choice: true,
    },
    {
        type: 'form',
        id: '113',
        items: hotelsDefault,
        selected: [1],
        submitted: false,
        sender: 1,
        multiple_choice: true,
    },
    {
        type: 'form',
        id: '123',
        items: hotelsDefault,
        selected: [],
        submitted: false,
        sender: 1,
        multiple_choice: false,
    },
    {
        type: 'text',
        text: 'Текст текст',
        id: '124',
        time: '01 : 00',
        sender: 2
    },
    {
        type: 'text',
        text: 'Текст текст2',
        id: '125',
        time: '01 : 00',
        sender: 1
    },
    {
        type: 'text',
        text: 'Прикрепите файл',
        id: '126',
        time: '01 : 00',
        sender: 2
    },
    {
        type: 'file',
        isLoaded: true,
        filename: 'userfile.ext',
        id: '127',
        time: '01 : 00',
        sender: 2
    },
]*/


/**
 * Должен предоставлять Conversations, Messages, Notifications, возможно Participants
 * Должен предоставлять данные о том, какая комната сейчас открыта у пользователя
 * */
export default function useChat({ socketHandler, authHandler }){
    const logger = useMemo(() => new Logger('useChat'), [])

    const { socket, isConnected } = socketHandler

    const [chatLoading, setChatLoading] = useState(false);
    const [chatError, setChatError] = useState(null);

    const { data:messages, setData:setMessages } = useFreshData({ socket, modelName: 'message' });
    const { data:conversations, setData:setConversations } = useFreshData({ socket, modelName: 'conversation' })
    const { data:participants, setData:setParticipants } = useFreshData({ socket, modelName: 'participant' });
    const { data:notifications, setData:setNotifications } = useFreshData({ socket, modelName: 'notification' });


    useEffect(()=>{
        if(!isConnected){
            return;
        }

        const abortController = new AbortController();

        preloadChat({ signal: abortController.signal });

        return (() => {
            abortController.abort();
        });
    }, [isConnected])

    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать. Хз */
    async function preloadChat({ signal }){
        setChatLoading(true);

        try{
            // Нужно сделать какую-то сортировку для админов.
            const res = await fetch('/api/chat/first-load', { signal });

            if(!res){
                // Случится только если signal сработает, вообще зачем этот signal, если хук работает в контексте
                return;
            }

            const json = await res.json();

            if(res.status === 200){
                logger.log("success:", json);
                setConversations(json.conversations);
                setParticipants(json.participants);
                setNotifications(json.notifications);
                setMessages(json.messages);
            }
            else {
                logger.log("error", json);
                setChatError(json);
            }
        }
        catch (err){
            logger.log(err);
            setChatError(err);
        }

        setChatLoading(false)
    }

    /**
     * message - объект, который содержит {
     *     conversation: ObjectId,
     *     type: 'text',
     *     text: 'Hello, World!'
     * }
     * */
    function sendMessage(message){
        logger.log("sendMessage", {message});
        socket.emit("send-message", message);
    }

    /*function joinConversation(conversation){
        socket.emit('join-conversation', conversation);
    }*/

    function deleteNotifications(conversationId){
        const ns = notifications.filter(n => n.conversation == conversationId);
        logger.log("deleteNotifications", {notifications: ns})
        // const ns = notifications.filter(n => messages.some(m => m.id == n.message));
        if(ns.length > 0){
            logger.log("deleteNotification", ns);
            socket.emit('delete-notifications', ns)
        }
    }

    async function loadMessages(conversation, skip, limit){
        const loadedMessages = await fetch('/api/chat/message/pagination/?'
            + new URLSearchParams({
                conversation,
                skip,
                limit
            })
        );
    }

    return {
        chatLoading,
        chatError,

        conversations,
        messages,
        participants,
        notifications,

        sendMessage,
        // joinConversation,
        deleteNotifications,
    }
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/