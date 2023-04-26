import React, { Fragment, useEffect, useState } from 'react';

import Button from '../ui/button/Button'
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../context/AppContext";

export default function Landing({}){

    const { authHandler } = useAppContext();
    const { authenticate, isAuthenticated } = authHandler;
    const navigate = useNavigate();

    /*useEffect(()=>{
        if(isAuthenticated){
            navigate('/profile', { replace: true });
        }
    })*/

    return (
        <Fragment>
            <Button onClick={e => authenticate({replace: true})}>Войти в систему</Button>
        </Fragment>
    )
}