import React, {useEffect} from 'react'
import {useAppContext} from "../context/AppContext";

export default function Chat(){
    const {socketHandler, authHandler} = useAppContext();
    const { socket, isConnected } = socketHandler;
    const {user, isAuthenticated} = authHandler;

    function send_message(message, room){
        if(isAuthenticated())
            socket.emit("send-message", user.email, "123")
    }

    useEffect(()=>{
        socket.on("receive-message", (message)=>{
            console.log("received", message);
        })
    }, [])

    useEffect(()=>{
        if(isConnected) // можно просто добавить volatile, но так понятнее
            socket.emit("join-room", "123")
    }, [isConnected])

    return <button onClick={e => send_message(0, 0)}>Send Message</button>
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