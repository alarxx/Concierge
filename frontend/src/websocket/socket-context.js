import React, {createContext, useContext, useEffect, useState} from 'react';

import {io} from 'socket.io-client';

const socket = io('http://localhost:3000');

const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }){
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

    return (
        <SocketContext.Provider value={{
            socket,
            isConnected,
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export {SocketProvider, useSocket};
