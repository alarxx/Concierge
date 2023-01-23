import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

import findIndexById from "../../handlers/findIndexById";
import setIds from '../../handlers/setIds'

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
    console.log("useChat\n", ...str);
}

function useFreshData({ socket, modelName }){
    const name = modelName.toLowerCase();

    const [data, setData] = useState([]);

    function _addDoc(doc){
        doc.id = doc._id;
        delete doc._id;

        console.log(`/save/${name}`, doc);

        setData(prev => [...prev, doc]);
    }
    function _removeDoc(doc){
        doc.id = doc._id;
        delete doc._id;

        console.log(`/delete/${name}`, doc);

        setData(prev => {
            const i = findIndexById(prev, doc.id)
            const clone = [...prev]
            clone.splice(i, 1);
            return clone;
        })
    }

    useEffect(() => {
        socket.on(`/save/${name}`, (doc) => {
            _addDoc(doc);
        });
        socket.on(`/delete/${name}`, (doc) => {
            _removeDoc(doc);
        });
    }, []);

    function addData(data){
        // здесь должна быть проверка(comparing) каждого документа из массива по времени и сетить только в случае если document моложе,
        // Если такого вообще нет, то мы добавляем
        setData(data);
    }

    return [data, setData, addData];
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

    const [ messages, setMessages, addMessages ] = useFreshData({socket, modelName: 'message'});
    const [ conversations, setConversations, addConversations ] = useFreshData({socket, modelName: "conversation"})
    const [ participants, setParticipants, addParticipants ] = useFreshData({socket, modelName: "participant"});
    const [ notifications, setNotifications, addNotifications ] = useFreshData({socket, modelName: "notification"});

    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать. Хз */
    async function preload (){
        try{
            const res = await fetch('/api/chat');
            const json = await res.json();
            if(res.status === 200){
                log("chat:", json);
                addMessages(setIds(json.messages));
                addConversations(setIds(json.conversations));
                addParticipants(setIds(json.participants));
                addNotifications(setIds(json.notifications));
            }
        }
        catch (err){
            log(err);
        }
    }
    useEffect(()=>{
        if(isAuthenticated()){
            preload();
        }
        else {
            if(messages.length || conversations.length || participants.length || notifications.length){
                log("chat:", null);
                setConversations([])
                setMessages([])
                setNotifications([])
                setParticipants([])
            }
        }
    }, [user])

    function sendMessage(message){
        socket.emit("send-message", message);
    }

    function joinConversation(conversation){
        socket.emit('join-conversation', conversation);
    }

    return {
        conversations,
        messages,
        participants,
        notifications,
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