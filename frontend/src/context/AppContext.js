import React, {createContext, useContext, useEffect, useState} from 'react';

import useAuth from "./hooks/useAuth";
import useOrder from "./hooks/useOrder";
import useChat from "./hooks/useChat";
import useSocket from "./hooks/useSocket";

const Context = createContext();

const useAppContext = () => useContext(Context);

function AppContextProvider({ children }){

    const socketHandler = useSocket()
    const authHandler = useAuth({...socketHandler});
    const orderHandler = useOrder({...socketHandler, ...authHandler});
    const chatHandler = useChat({...socketHandler, ...authHandler, ...orderHandler});

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
