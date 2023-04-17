import React, {createContext, useContext, useEffect, useState} from 'react';

import useAdaptive from "./hooks/useAdaptive";
import useSocket from "./hooks/useSocket";
import useAuth from "./hooks/auth/useAuth";
import useURLState from "./hooks/useURLState";

const Context = createContext();

const useAppContext = () => useContext(Context);

function AppContextProvider({ children }){

    const URLStateHandler = useURLState();
    const adaptiveHandler = useAdaptive();
    const socketHandler = useSocket();
    const authHandler = useAuth({socketHandler});

    return (
        <Context.Provider value={{
            URLStateHandler,
            adaptiveHandler,
            socketHandler,
            authHandler,
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