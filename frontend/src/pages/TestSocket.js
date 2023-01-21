import React, {useEffect} from 'react'
import useSocket from "../context/hooks/useSocket";

export default function TestSocket(){
    const {isConnected, socket} = useSocket();

    useEffect(()=>{
        socket.on("whoami", user => console.log("whoami", user));
    }, [])

    useEffect(()=>{
        setInterval(()=>socket.connect(), 300000);
        setInterval(()=>socket.emit("whoami"), 300000);
    }, [])

    return <h1>Socket: {String(isConnected)} {socket.id}</h1>
}