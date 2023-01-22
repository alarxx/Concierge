import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";


const conversationsDefault = [
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
]

/**
 * Мы сразу загружаем всю нужную информацию (Все беседы, сообщения, где состоит пользователь, мы с бэка это делаем. Когда мы присоединяемся к беседе, мы должны дополнить наши данные)
 * Должен предоставлять Conversations, Messages, Notifications, возможно Participants
 * Должен предоставлять данные о том, какая комната сейчас открыта у пользователя
 * */
export default function useChat({socketHandler}){
    const {socket} = socketHandler

    const navigate = useNavigate()

    /**
     * Мы сразу все в куче загружаем, а фильтровать их уже потом будем
     * */
    const [conversations, setConversations] = useState(conversationsDefault)
    const [messages, setMessages] = useState(messagesDefault);
    const [participants, setParticipants] = useState(messagesDefault);
    const [notifications, setNotifications] = useState(messagesDefault);

    function _addСonverstion(conversation){
        setConversations(prev => [...prev, conversation]);
    }
    function _addMessage(message){
        setMessages(prev => [...prev, message]);
    }
    function _addParticipant(participant){
        setParticipants(prev => [...prev, participant]);
    }
    function _addNotification(notification){
        setNotifications(prev => [...prev, notification]);
    }

    useEffect(() => {
        socket.on('request-message', (message) => {
            _addMessage(message);
        });
    }, []);

    function openConversation(conversation){
        // Мы должны проверить состоит ли пользователь в этом conversation
        navigate(`/chat/${conversation.id}`)
    }
    function closeConversation(){
        navigate(-1)
    }

    function sendMessage(message){
        socket.emit('send-message', message);
        _addMessage(message);
    };

    function joinConversation(conversation){
        socket.emit('join-conversation', conversation);
    };

    return {
        conversations,
        messages,
        setMessages,
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