import React, {useEffect} from 'react';

import {useAppContext} from "../context/AppContext";

import Logger from '../internal/Logger';
const logger = new Logger('CheckAuthenticated');

/**
 * Нужно пересмотреть. Здесь идет race isAuthenticated, изначально он null и если перейти по ссылке с этим middleware, то он перебросит на /authentication, хотя user(whoami) просто не успел догрузиться.
 * Может быть можно блокировать все, пока userLoading?
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
 * Мы ставим обработчик, который каждый раз, когда userLoading меняет состояние, будет проверять аутентифицированность.
 *
 * if(userLoading) означает неопределенность, он может быть как аутентифицирован, так и нет.
 * if(userLoading && Object.keys(user).length === 0) позволяет не показывать loading, когда пользователь был подключен, но сокет из-за чего-то отключился.
 * if(!userLoading && isAuthenticated) уже точно говорит об аутентифицированности.
 * */
export default function CheckAuthenticated({ page }){

    const { authHandler } = useAppContext();
    const { user, userLoading, userError, isAuthenticated, authenticate } = authHandler;

    useEffect(()=>{
        if(userLoading){
            logger.log({userLoading});
        }
        else if(!isAuthenticated && userError.message !== 'xhr poll error') {
            authenticate();
        }
        else {
            logger.log("passed:", {email: user.email});
        }
    }, [userLoading])


    if(userError?.message === 'xhr poll error'){
        return <p>offline</p>
    }
    else if(userLoading && Object.keys(user).length === 0){
        return <p>loading...</p>
    }
    else if(!isAuthenticated) {
        return <p>{userError.message}</p>
    }
    else {
        return page;
    }
}