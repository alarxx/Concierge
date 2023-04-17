import React, {useEffect, useState} from 'react'
import {io} from "socket.io-client";

import Logger from '../../internal/Logger';
const logger = new Logger('useSocket');

const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000': '';

const OPTS = {
    withCredentials: true
}

const socket = io(URL, OPTS);

export default function useSocket(){
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(()=>{
        logger.log(`socket connected ${isConnected}`)
    }, [isConnected])

    useEffect(()=>{
        socket.on('connect', ()=>{
            setIsConnected(true);
            logger.log(`you connected with id(${socket.id})`);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            logger.log(`you disconnected`);
        });

        socket.on("connect_error", (err) => {
            setIsConnected(false)
            logger.log("connect_error", err.message); // prints the message associated with the error
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    },  [])

    function reconnect(){
        logger.log("reconnect");
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