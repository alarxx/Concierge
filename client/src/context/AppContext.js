import React, {createContext, useContext} from 'react';

import useAdaptive from "./hooks/adaptive/useAdaptive";
import useSocket from "./hooks/socket/useSocket";
import useAuth from "./hooks/auth/useAuth";
import useURLState from "./hooks/url_state/useURLState";
import useChat from "./hooks/chat/useChat";
import useOrder from "./hooks/order/useOrder";

const Context = createContext();

const useAppContext = () => useContext(Context);

function AppContextProvider({ children }){

    const URLStateHandler = useURLState();
    const adaptiveHandler = useAdaptive();
    const socketHandler = useSocket();
    const authHandler = useAuth({socketHandler});

    const chatHandler = useChat({socketHandler, authHandler});
    const orderHandler = useOrder({socketHandler, authHandler});

    return (
        <Context.Provider value={{
            URLStateHandler,
            adaptiveHandler,
            socketHandler,
            authHandler,
            chatHandler,
            orderHandler,
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