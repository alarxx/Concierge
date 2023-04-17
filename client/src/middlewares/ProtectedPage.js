import React, {useEffect} from 'react';

import {useAppContext} from "../context/AppContext";

import Logger from '../internal/Logger';
const logger = new Logger('ProtectedPage');

/**
 * Нужно пересмотреть. Здесь идет race isAuthenticated, изначально он null и если перейти по ссылке с этим middleware, то он перебросит на /authentication, хотя user(whoami) просто не успел догрузиться.
 * Может быть можно блокировать все, пока userLoading?
 * Решил эту проблему простым бездействием пока userLoading=true
 *
 * Пересмотрел.
 * Добавил проверку на userLoading. Мы не перебрасываем на страницу аутентификации, если userLoading.
 * userLoading изначально true.
 * Сразу при старте приложения, если socket подключен, кидается запрос на whoami.
 * Если socket не подключен то, пользователь продолжает ждать пока socket не выдаст ошибку.
 * Есть причины, почему мы не можем кинуть запрос на whoami, когда сокет не подключен,
 * а вдруг просто связь пропала во время пользования приложением.
 * Ошибка того, что пользователь не аутентифицирован прилетит сразу, а вот ошибка подключения нет, как в принципе и должно быть.
 *
 * Мы ставим обработчик, который каждый раз, когда userLoading и userError меняет состояние, будет проверять аутентифицированность.
 * Почему нужен еще и userError?
 * Например, при отсутствии подключения на первой загрузке у нас прилетает connect_error -> loading=false, user={}, error={message: 'Unauthorized'}
 *
 * if(userLoading) означает неопределенность, он может быть как аутентифицирован, так и нет.
 * if(userLoading && !wasAuthenticated) позволяет не показывать loading, когда пользователь был подключен, но сокет из-за чего-то отключился.
 * if(!userLoading && isAuthenticated) уже точно говорит об аутентифицированности.
 * */
export default function ProtectedPage({ children }){

    const { authHandler } = useAppContext();
    const { user, userLoading, userError, isAuthenticated, wasAuthenticated, authenticate } = authHandler;

    /* Здесь рассчитываем всего на 2 типа ошибки: 'xhr poll error' и 'Unauthorized'*/
    useEffect(()=>{
        if(userLoading){
            return logger.log({ userLoading });
        }

        if(!isAuthenticated && userError.message !== 'xhr poll error') {
            authenticate({ replace: true });
        }
        else if(!userError){
            logger.log("passed:", {email: user.email});
        }
    }, [userLoading, userError])


    // Если был залогинен, то мы не дергаем страницу.
    if(userError?.message === 'xhr poll error'){
        return (<>
            <p>offline</p>
            {wasAuthenticated && children}
        </>);
    }
    else if(userLoading && !wasAuthenticated){
        return (<>
            <p>loading...</p>
            {wasAuthenticated && children}
        </>);
    }
    // Здесь может выдаться непредвиденная ошибка только, так как в useEffect рассчитываю некоторые ошибки.
    else if(!isAuthenticated) {
        return <p>Unhandled error: {userError.message}</p>
    }
    else {
        return children;
    }

}