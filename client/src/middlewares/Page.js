import React, {Fragment, useEffect} from 'react';

import {useAppContext} from "../context/AppContext";

import Logger from '../internal/Logger';
const logger = new Logger('ProtectedPage');

import NavigationPanel from '../widgets/navigation_panel/NavigationPanel';
import NavbarPanel from '../widgets/navbar_panel/NavbarPanel';

/**
 * Скопировано из ProtectedPage.js
 * */
export default function Page({ children }){

    const { authHandler } = useAppContext();
    const { userLoading, isOffline } = authHandler;

    // Если был залогинен, то мы не дергаем страницу.
    if(isOffline){
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
        return (
            <Fragment>
                <NavbarPanel/>
                {children}
                <NavigationPanel />
            </Fragment>
        );
    }

}