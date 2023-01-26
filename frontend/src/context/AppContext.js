import React, {createContext, useContext, useEffect, useState} from 'react';

import useAuth from "./hooks/useAuth";
import useOrder from "./hooks/useOrder";
import useChat from "./hooks/useChat";
import useSocket from "./hooks/useSocket";
import useHotel from "../hooks/api/useHotel";
import useOffice from "./hooks/data/useOffice";
import useService from "./hooks/data/useService";

const Context = createContext();

const useAppContext = () => useContext(Context);

function AppContextProvider({ children }){


    const socketHandler = useSocket()
    const authHandler = useAuth({socketHandler});
    const ordersHandler = useOrder({socketHandler, authHandler});
    const chatHandler = useChat({socketHandler, authHandler, ordersHandler});

    const officesHandler = useOffice({authHandler, socketHandler})
    const servicesHandler = useService({authHandler, socketHandler})

    return (
        <Context.Provider value={{
            socketHandler,
            authHandler,
            ordersHandler,
            chatHandler,
            officesHandler,
            servicesHandler
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