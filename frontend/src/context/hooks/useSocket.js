import React, {useEffect, useState} from 'react'
import {io} from "socket.io-client";

const socket = io('http://localhost:3000');

export default function useSocket(){
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(()=>{
        socket.on('connect', ()=>{
            setIsConnected(true);
            // console.log(`you connected with id: ${websocket.id}`);
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            //websocket.disconnect();
        };
    },  [])

    return {
        isConnected,
        socket,
    }
}