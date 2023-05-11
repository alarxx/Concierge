import React from 'react';

import useOrderData from './order/useOrderData'
import useChatData from './chat/useChatData'

export default function useData({ socketHandler, authHandler }){

    const orderDataHandler = useOrderData({ socketHandler, authHandler });
    const chatDataHandler = useChatData({ socketHandler, authHandler });

    return ({
        orderDataHandler,
        chatDataHandler
    });
}