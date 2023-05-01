import React, {Fragment, useEffect, useMemo} from 'react';

import {useAppContext} from "../context/AppContext";

import Logger from '../internal/Logger';
import Popup from "../shared/ui/popup/Popup";

/**
 * Скопировано из ProtectedPage.js
 * */
export default function Page({ children }){

    const logger = useMemo(()=>new Logger('ProtectedPage'), []);

    const { authHandler } = useAppContext();
    const { userLoading, isOffline } = authHandler;

    // Если был залогинен, то мы не дергаем страницу.
    if(isOffline){
        // pop-up окно должно быть
        return (<>
            <Popup variant={'danger'}>
                <p>offline</p>
            </Popup>
            {children}
        </>);
    }
    else if(userLoading){
        console.log("Page.js: user loading")
        // pop-up
        return (<>
            <Popup>
                <p>loading...</p>
            </Popup>
            {children}
        </>);
    }
    else {
        return (<>
            {children}
        </>);
    }

}