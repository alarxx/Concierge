import React, {useEffect, useState} from 'react'
/**
 * Придется писать хук для отправки и получения сообщений
 * */
import { useSocket } from '../../../websocket/socket-context';
import Conversations from "./Conversations";
import Messanger from "./Messanger";


const conversationsDefault = [
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:3
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:3
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    },
    {
        name:"Командировка",
        last_message:"Сообщение сообщение",
        unread_num:0
    }
]

const user = {id: '1'};
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
        sender: '1',
        multiple_choice: true,
    },
    {
        type: 'form',
        id: '123',
        items: hotelsDefault,
        selected: [],
        submitted: false,
        sender: '1',
        multiple_choice: false,
    },
    {
        type: 'text',
        text: 'Текст текст',
        id: '124',
        time: '01 : 00',
        sender: '2'
    },
    {
        type: 'text',
        text: 'Текст текст2',
        id: '125',
        time: '01 : 00',
        sender: '1'
    },
    {
        type: 'text',
        text: 'Прикрепите файл',
        id: '126',
        time: '01 : 00',
        sender: '2'
    },
    {
        type: 'file',
        isLoaded: true,
        id: '127',
        time: '01 : 00',
        sender: '2'
    },
]

export default function ChatApp(){
    const {socket, isConnected} = useSocket();
    const [messages, setMessages] = useState(messagesDefault);
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');

    const [isChatOpen, setIsChatOpen] = useState(false)
    const [chat, setChat] = useState();

    function openChat(conversation){
        setChat(conversation)
        setIsChatOpen(true)
    }
    function closeChat(){
        setIsChatOpen(false)
    }

    useEffect(() => {
        socket.on('chat-message', (msg) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        });
    }, []);

    const submitMessage = e => {
        e.preventDefault();
        socket.emit('chat-message', message, room);
        setMessage('');
    };

    const submitRoom = e => {
        e.preventDefault();
        socket.emit('join-room', room);
    };

    return (
        <>
            {!isChatOpen && <Conversations conversations={conversationsDefault} openChat={openChat}/>}
            {isChatOpen && <Messanger user={user} messages={messages} setMessages={setMessages} closeChat={closeChat}/>}
        </>
    );
};