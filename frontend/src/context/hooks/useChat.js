import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

import findIndexById from "../../handlers/findIndexById";

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

function useMessages({ socket, user, isAuthenticated }){

    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(true);
    const [messagesError, setMessagesError] = useState();


    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать. Хз */
    async function preloadMessages (){
        setMessagesLoading(true);
        try{
            const res = await fetch('/api/chat/message');
            const json = await res.json();
            setMessagesLoading(false);
            if(res.status === 200)
                setMessages(json);
        }
        catch (err){
            console.log(err);
            setMessagesLoading(false);
            setMessagesError(err.error);
        }
    }


    function _addMessage(message){
        setMessages(prev => [...prev, message]);
    }
    function _removeMessage(message){
        setMessages(prev => {
            const i = findIndexById(prev, message.id)
            const newMessages = [...prev]
            newMessages.splice(i, 1);
            return newMessages;
        })
    }

    useEffect(()=>{
        if(isAuthenticated()){
            preloadMessages();
        }
        else {
            if(messages.length)
                setMessages([])
        }
    }, [user])

    useEffect(() => {
        socket.on('/save/message', (message) => {
            _addMessage(message);
        });
        socket.on('/delete/message', (message) => {
            _removeMessage(message);
        });
    }, []);

    function sendMessage(message, conversation){
        socket.emit("send-message", message, conversation);
    }

    return { messages, sendMessage };
}
function useConversations({ socket, user, isAuthenticated }){

    const [conversations, setConversations] = useState([]);
    const [conversationsLoading, setConversationsLoading] = useState(true);
    const [conversationsError, setConversationsError] = useState();


    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать. Хз */
    async function preloadConversations (){
        setConversationsLoading(true);
        try{
            const res = await fetch('/api/order');
            const json = await res.json();
            setConversationsLoading(false);
            if(res.status === 200)
                setConversations(json);
        }
        catch (err){
            console.log(err);
            setConversationsLoading(false);
            setConversationsError(err.error);
        }
    }


    function _addMessage(message){
        setConversations(prev => [...prev, message]);
    }
    function _removeMessage(message){
        setConversations(prev => {
            const i = findIndexById(prev, message.id)
            const newMessages = [...prev]
            newMessages.splice(i, 1);
            return newMessages;
        })
    }

    useEffect(()=>{
        if(isAuthenticated()){
            preloadConversations();
        }
        else {
            if(conversations.length)
                setConversations([])
        }
    }, [user])

    useEffect(() => {
        socket.on('/save/message', (message) => {
            _addMessage(message);
        });
        socket.on('/delete/message', (message) => {
            _removeMessage(message);
        });
    }, []);

    function sendMessage(message, conversation){
        socket.emit("send-message", message, conversation);
    }

    return { messages: conversations, sendMessage };
}



/**
 * Мы сразу загружаем всю нужную информацию (Все беседы, сообщения, где состоит пользователь, мы с бэка это делаем. Когда мы присоединяемся к беседе, мы должны дополнить наши данные)
 * Должен предоставлять Conversations, Messages, Notifications, возможно Participants
 * Должен предоставлять данные о том, какая комната сейчас открыта у пользователя
 * */
export default function useChat({socketHandler, authHandler}){
    const {socket} = socketHandler
    const {user, isAuthenticated} = authHandler

    const navigate = useNavigate()

    const { messages, sendMessage } = useMessages({socket, user, isAuthenticated});

    /**
     * Мы сразу все в куче загружаем, а фильтровать их уже потом будем
     * */
    const [conversations, setConversations] = useState(conversationsDefault)
    const [participants, setParticipants] = useState(messagesDefault);
    const [notifications, setNotifications] = useState(messagesDefault);

    function _addConversation(conversation){
        setConversations(prev => [...prev, conversation]);
    }
    function _removeConversation(conversation){
        setConversations(prev => {
            const i = findIndexById(prev, conversation.id)
            const newMessages = [...prev]
            newMessages.splice(i, 1);
            return newMessages;
        })
    }

    function _addParticipant(participant){
        setParticipants(prev => [...prev, participant]);
    }
    function _addNotification(notification){
        setNotifications(prev => [...prev, notification]);
    }



    // Нужны ли эти методы здесь? Вроде нет
    function openConversation(conversation){
        // Мы должны проверить состоит ли пользователь в этом conversation
        navigate(`/chat/${conversation.id}`)
    }
    function closeConversation(){
        navigate(-1)
    }


    function joinConversation(conversation){
        socket.emit('join-conversation', conversation);
    };

    return {
        conversations,
        messages,
        participants,
        notifications,
        openConversation,
        closeConversation,
        sendMessage,
        joinConversation,
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