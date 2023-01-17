import React, {createContext, useContext, useEffect, useState} from 'react';

import useAuth from "./hooks/useAuth";
import useOrder from "./hooks/useOrder";
import useChat from "./hooks/useChat";
import useSocket from "./hooks/useSocket";

const Context = createContext();

const useAppContext = () => useContext(Context);

function AppContextProvider({ children }){

    const socketHandler = useSocket()
    const authHandler = useAuth(socketHandler.socket);
    const orderHandler = useOrder(socketHandler.socket);
    const chatHandler = useChat(socketHandler.socket, orderHandler);

    return (
        <Context.Provider value={{
            socketHandler,
            authHandler,
            orderHandler,
            chatHandler,
        }}>
            {children}
        </Context.Provider>
    );
};

export {AppContextProvider, useAppContext};
