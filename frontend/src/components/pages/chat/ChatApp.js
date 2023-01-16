import React, {useEffect, useState} from 'react'
/**
 * Придется писать хук для отправки и получения сообщений
 * */
import { useSocket } from '../../hooks/socket-context';
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
    }
]


export default function AppChatArchive(){
    const {socket, isConnected} = useSocket();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');

    const [isChatOpen, setIsChatOpen] = useState(false)
    const [chat, setChat] = useState();

    function openChat(conversation){
        setChat(conversation.id)
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
            {isChatOpen && <Messanger messages={"messagesOn"} closeChat={closeChat}/>}
        </>
    );
};

/*
<div>
    <ul>
        {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
        ))}
    </ul>
    <form onSubmit={submitMessage}>
        <input value={message} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Send</button>
    </form>

    <form onSubmit={submitRoom}>
        <input value={room} onChange={e => setRoom(e.target.value)} />
        <button type="submit">Join</button>
    </form>
</div>
* */