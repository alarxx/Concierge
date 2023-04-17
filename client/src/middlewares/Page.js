import React, {useEffect} from 'react';

import {useAppContext} from "../context/AppContext";

import Logger from '../internal/Logger';
const logger = new Logger('ProtectedPage');

/**
 * Скопировано из ProtectedPage.js
 * */
export default function Page({ children }){

    const { authHandler } = useAppContext();
    const { userLoading, userError } = authHandler;

    // Если был залогинен, то мы не дергаем страницу.
    if(userError?.message === 'xhr poll error'){
        // pop-up окно должно быть
        return (<>
            <p>offline</p>
            {children}
        </>);
    }
    else if(userLoading){
        // pop-up
        return (<>
            <p>loading...</p>
            {children}
        </>);
    }
    else {
        return children;
    }

}