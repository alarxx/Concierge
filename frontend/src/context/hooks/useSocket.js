import React, {useEffect, useState} from 'react'
import {io} from "socket.io-client";

const URL = process.env.NODE_ENV==='production' ? 'http://159.223.19.108:3000' : 'http://localhost:3000';

console.log(URL);

const OPTS = {
    withCredentials: true
}

const socket = io(URL, OPTS);

function log(...str){
    // console.log("useSocket\n", ...str);
}

export default function useSocket(){
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(()=>{
        socket.on('connect', ()=>{
            setIsConnected(true);
            log(`socket.io: you connected with id: ${socket.id}`);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            log(`socket.io: you disconnected`);
        });

        socket.on("connect_error", (err) => {
            setIsConnected(false)
            log("socket.io: connect_error", err.message); // prints the message associated with the error
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            //websocket.disconnect();
        };
    },  [])

    function reconnect(){
        log("RECONNECT");
        socket.disconnect();
        socket.connect();
    }

    return {
        isConnected,
        socket,
        reconnect,
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