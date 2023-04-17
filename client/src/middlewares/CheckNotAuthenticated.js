import React, {useEffect} from 'react';

import {useAppContext} from "../context/AppContext";
import {Navigate} from "react-router-dom";

import Logger from '../internal/Logger';
const logger = new Logger('CheckNotAuthenticated');

export default function CheckNotAuthenticated({ page }){

    const { authHandler } = useAppContext();

    useEffect(()=>{
        logger.log(authHandler.user);
    }, [])

    if(authHandler.isAuthenticated){
        return <Navigate to={'/'}/>
    }

    return page;
}