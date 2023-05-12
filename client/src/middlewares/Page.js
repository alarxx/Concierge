import React, {Fragment, useEffect, useMemo} from 'react';

import {useAppContext} from "../context/AppContext";

import Logger from '../internal/Logger';
import Alert from "../shared/ui/alert/Alert";
import Loader from "../shared/ui/loader/Loader";
import Block from "../shared/ui/block/Block";
import Overlay from "../shared/ui/overlay/Overlay";

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
            <Alert variant={'danger'}>
                <p>offline</p>
            </Alert>
            {children}
        </>);
    }
    else if(userLoading){
        console.log("Page.js: user loading")
        // pop-up
        return (<>
            <Overlay>
                <Block isAlignCenter={true}>
                    <Loader color={'white'}/>
                </Block>
            </Overlay>
            {children}
        </>);
    }
    else {
        return (<>
            {children}
        </>);
    }

}