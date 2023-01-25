import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

function log(...str){
    console.log("useAuth\n", ...str);
}

export default function useAuth({socketHandler}){
    const {socket, isConnected, reconnect} = socketHandler;

    const [user, setUserState] = useState({});
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);

    useEffect(()=>{
        socket.on("connect_error", err => {
            setUserLoading(false)
            setUserError(err)
        });
    }, [])

    /** Так мы понимаем, что произошел reconnect */
    useEffect(()=>{
        if(isConnected){
            whoami();
        }
        else {
            log("set user {}");
            setUser({});
        }
    }, [isConnected])

    /*useEffect(()=>{
        log('User', `\nisAuthenticated: ${isAuthenticated()}`, '\nuser:', user);
    }, [user])*/


    function setUser(obj){
        setUserLoading(false)
        setUserState(obj)
    }

    async function userFetch(url, opt={}){
        setUserLoading(true);

        if(opt.body && typeof opt.body !== 'string')
            opt.body = JSON.stringify(opt.body);

        try{
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                ...opt
            });

            const json = await response.json();

            log(response);

            if(response.status === 200 || response.status === 201){
                reconnect(); // У нас отправится запрос после этого на whoami и засетится user
                return null;
            }
            else {
                // log("set user {}"); // Почему мы не можем сделать reconnect? У нас снова придет whoami, но не засетит юзера и он останется старым
                // setUser({}); // Зачем нам скидывать сет юзера, короче это делать мы должны только через whoami
                setUserLoading(false);
                setUserError(json);
                return json;
            }

        }
        catch(err){
            setUserLoading(false)
            setUserError(err);
            return err;
        }
    }

    const login = async (body) => {
        return await userFetch('/auth/login', {method: 'POST', body})
    }

    const register = async (body) => {
        return await userFetch('/auth/register', {method: 'POST', body})
    }

    const logout = async () => {
        return await userFetch('/auth/logout', {method: 'DELETE'})
    }

    const whoami = () => {
        setUserLoading(true)
        // Метод дожидается пока socket подключится, поэтому не нужна проверка isConnected
        socket.emit('whoami', setUser)
    }

    const isAuthenticated = () => Boolean(user?.email)

    return {
        user, userLoading, userError,
        login,
        register,
        logout,
        isAuthenticated,
    };
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/
