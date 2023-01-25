import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

import findIndexById from "../../handlers/findIndexById";
import setIds from '../../handlers/setIds'
import useFreshData from "../../hooks/useFreshData";

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

function log(...str){
    // console.log("useChat\n", ...str);
}

/**
 * Мы сразу все в куче загружаем, а фильтровать их уже потом будем.
 * Мы сразу загружаем всю нужную информацию (Все беседы, сообщения, где состоит пользователь, мы с бэка это делаем. Когда мы присоединяемся к беседе, мы должны дополнить наши данные)
 * Должен предоставлять Conversations, Messages, Notifications, возможно Participants
 * Должен предоставлять данные о том, какая комната сейчас открыта у пользователя
 * */
export default function useChat({socketHandler, authHandler}){

    const { socket } = socketHandler
    const { user, isAuthenticated } = authHandler

    const [chatLoading, setChatLoading] = useState(true);

    const [ messages, setMessages, updateMessages, _upsertMessage ] = useFreshData({socket, modelName: 'message'});
    const [ conversations, setConversations, updateConversations ] = useFreshData({socket, modelName: "conversation"})
    const [ participants, setParticipants, updateParticipants ] = useFreshData({socket, modelName: "participant"});
    const [ notifications, setNotifications, updateNotifications ] = useFreshData({socket, modelName: "notification"});


    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать. Хз */
    async function preload (){
        try{
            setChatLoading(true);
            const res = await fetch('/api/chat');
            const json = await res.json();
            if(res.status === 200){
                log("chat:", json);
                updateMessages(setIds(json.messages));
                updateConversations(setIds(json.conversations));
                updateParticipants(setIds(json.participants));
                updateNotifications(setIds(json.notifications));
            }
        }
        catch (err){
            log(err);
        }
        setChatLoading(false)
    }
    useEffect(()=>{
        if(isAuthenticated()){
            preload();
        }
        else {
            // Как понять, что до этого мы были авторизованы
            if(messages.length || conversations.length || participants.length || notifications.length){
                // log("chat:", null);
                setConversations([])
                setMessages([])
                setNotifications([])
                setParticipants([])
            }
            setChatLoading(false)
        }
    }, [user])

    function sendMessage(message){
        socket.emit("send-message", message);
    }

    function joinConversation(conversation){
        socket.emit('join-conversation', conversation);
    }

    function deleteNotifications(messages){
        // const ms = messages.filter(m => m.conversation == conversation.id);
        const ns = notifications.filter(n => messages.some(m => m.id == n.message));
        if(ns.length !== 0){
            log("deleteNotification", ns);
            socket.emit('delete-notifications', ns)
        }
    }

    return {
        conversations,
        messages,
        participants,
        notifications,
        sendMessage,
        joinConversation,
        _upsertMessage,
        deleteNotifications,
        chatLoading
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