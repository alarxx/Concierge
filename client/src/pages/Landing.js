import React, { Fragment, useEffect, useState } from 'react';

import Button from '../ui/button/Button'
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

    return (
        <Fragment>
            { isAuthenticated && <Button onClick={e => navigate('/profile')}>Главная страница (пока что profile)</Button>}
            {!isAuthenticated && <Button onClick={e => authenticate({replace: false})}>Войти в систему</Button>}
        </Fragment>
    )
}