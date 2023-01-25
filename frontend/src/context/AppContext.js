import React, {createContext, useContext, useEffect, useState} from 'react';

import useAuth from "./hooks/useAuth";
import useOrder from "./hooks/useOrder";
import useChat from "./hooks/useChat";
import useSocket from "./hooks/useSocket";
import useHotel from "../hooks/api/useHotel";

const Context = createContext();

const useAppContext = () => useContext(Context);

function AppContextProvider({ children }){

    // const hotelsHandler = useHotel();

    const socketHandler = useSocket()
    const authHandler = useAuth({socketHandler});
    const orderHandler = useOrder({socketHandler, authHandler});
    const chatHandler = useChat({socketHandler, authHandler, orderHandler});

    useEffect(()=>{
        (async ()=>{
            // console.log(new Query)
            // const response = await fetch('/api/office');
        })();
    }, []);

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

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/