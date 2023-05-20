import React, {useEffect} from 'react';

import {useAppContext} from "../context/AppContext";

import Logger from '../internal/Logger';
import {Navigate, useNavigate} from "react-router-dom";
import Alert from "../shared/ui/alert/Alert";
import Block from "../shared/ui/block/Block";
import Loader from "../shared/ui/loader/Loader";
import Overlay from "../shared/ui/overlay/Overlay";
import Loading from "../shared/loading/Loading";
import NotFound404 from "../pages/NotFound404";
const logger = new Logger('ProtectedPage');

export default function AdminPage({ children }){

    const { authHandler } = useAppContext();
    const { user, userLoading, userError, isAuthenticated, wasAuthenticated, isOffline, authenticate } = authHandler;

    // Что вообще должно происходить здесь?
    // оффлайн не повод скидывать нас на страницу аутентификации, поэтому мы перекидываем на home page ('/')
    useEffect(()=>{
        if(userLoading){
            return logger.log("We can't say anything yet, the user is loading");
        }
        // isAuthenticated = (!userLoading && !userError) && Object.keys(user).length > 0, - 100% пользователь аутентифицирован
        // wasAuthenticated = (userLoading || userError) && Object.keys(user).length > 0, - пользователь был аутентифицирован, но соединение прервано или произошла ошибка
        // isOffline = userError?.message === 'xhr poll error' - 100% оффлайн
        logger.log({isAuthenticated, wasAuthenticated, isOffline});
        if(!isAuthenticated && !wasAuthenticated && !isOffline){
            authenticate({ replace: true });
        }

    }, [userLoading, userError])

    if(user.role !== 'admin') {
        return(<>
            <NotFound404 />
        </>)
    }

    // Если был залогинен, то мы не дергаем страницу.
    if(isOffline){
        if(!wasAuthenticated){
            return (<Navigate to={'/'} />);
        }
        return (<>
            <Alert variant={'danger'}>
                <p>Соединение потеряно</p>
            </Alert>
            {children}
        </>);
    }
    else if(userLoading){
        console.log("ProtectedPage.js: user loading");

        return (<>
            <Loading />
            {wasAuthenticated && children}
        </>);
    }
        // Здесь может выдаться непредвиденная ошибка только, потому что в useEffect рассчитываю некоторые ошибки.
    // Никогда не будет выполняться?
    else if(!isAuthenticated) {
        return <p>Unhandled error: {userError?.message}</p>
    }
    else {
        return children;
    }

}