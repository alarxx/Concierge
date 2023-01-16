/**
 * Придется писать хук для отправки и получения сообщений
 * */
import React, {useEffect, useState} from 'react';
import { useSocket } from '../src/components/hooks/socket-context';

export default function AppChatArchive(){
    const {socket, isConnected} = useSocket();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [room, setRoom] = useState('');

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
    );
};