import React, {createContext, useContext} from 'react';

import useAdaptive from "./hooks/adaptive/useAdaptive";
import useSocket from "./hooks/socket/useSocket";
import useAuth from "./hooks/auth/useAuth";
import useURLState from "./hooks/url_state/useURLState";
import useChat from "./hooks/chat/useChat";
import useOrder from "./hooks/order/useOrder";
import useData from "./hooks/data/useData";
import useNotifications from "./hooks/notifications/useNotifications";
import useLoader from "./hooks/loader/useLoader";

const Context = createContext();

const useAppContext = () => useContext(Context);

function AppContextProvider({ children }){

    const URLStateHandler = useURLState();
    const adaptiveHandler = useAdaptive();
    const socketHandler = useSocket();
    const authHandler = useAuth({socketHandler});

    const chatHandler = useChat({socketHandler, authHandler});
    const orderHandler = useOrder({socketHandler, authHandler});

    const dataHandler = useData({ socketHandler, authHandler });
    const loaderHandler = useLoader({ socketHandler, authHandler });

    const notificationsHandler = useNotifications();

    return (
        <Context.Provider value={{
            URLStateHandler,
            adaptiveHandler,
            socketHandler,
            authHandler,
            chatHandler,
            orderHandler,
            dataHandler,
            loaderHandler,
            notificationsHandler,
        }}>
            {children}
        </Context.Provider>
    );
}

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