import React, {useEffect, useState} from 'react'
import {io} from "socket.io-client";

const URL = 'http://localhost:3000';
const OPTS = {
    withCredentials: true
}

const socket = io(URL, OPTS);

export default function useSocket(){
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(()=>{
        socket.on('connect', ()=>{
            setIsConnected(true);
            console.log(`socket.io: you connected with id: ${socket.id}`);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            console.log(`socket.io: you disconnected`);
        });

        socket.on("connect_error", (err) => {
            setIsConnected(false)
            console.log("socket.io: connect_error", err.message); // prints the message associated with the error
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

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/