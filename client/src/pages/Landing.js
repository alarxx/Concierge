import React, { Fragment, useEffect, useState } from 'react';

import Button from '../shared/ui/button/Button'
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../context/AppContext";

export default function Landing({}){

    const { authHandler } = useAppContext();
    const { authenticate, isAuthenticated } = authHandler;
    const navigate = useNavigate();

    /*
    // А если на Landing находится нужная информация?
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/profile', { replace: true });
        }
    })*/

    function setReactFavicon(){
        const favicon = document.querySelector('[rel=icon]');
        favicon.href = "https://reactjs.org/favicon.ico";
    }

    function setGoogleFavicon(){
        const favicon = document.querySelector('[rel=icon]');
        favicon.href = "https://www.google.com/favicon.ico";
    }

    function setFavicon(url){
        const favicon = document.querySelector('[rel=icon]');
        favicon.href = url;
    }

    return (
        <>
            { isAuthenticated && <Button onClick={e => navigate('/profile')}>Главная страница (пока что profile)</Button>}
            {!isAuthenticated && <Button onClick={e => authenticate({replace: false})}>Войти в систему</Button>}

            <button onClick={setReactFavicon}>Set React Favicon</button>
            <button onClick={setGoogleFavicon}>Set Google Favicon</button>
        </>
    )
}