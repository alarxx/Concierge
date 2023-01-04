import React, {useEffect, useState} from 'react';

import {io} from 'socket.io-client';

// const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const socket = io('http://localhost:3000');

export default function Main(){
    const [isConnected, setIsConnected] = useState(socket.connected);
    useEffect(()=>{
        socket.on('connect', ()=>{
            setIsConnected(true);
            console.log(`you connected with id: ${socket.id}`);
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    },  [])
    return (<h1>Hello socket.io!</h1>);
}