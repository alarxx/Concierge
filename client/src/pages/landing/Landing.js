import React, {useEffect, useState} from 'react';

import Logger from '../../internal/Logger';
import {useAppContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";
const logger = new Logger('Landing');

export default function Landing({}){
    const navigate = useNavigate();

    const { authHandler } = useAppContext();
    const { user, userLoading, userError, isAuthenticated, authenticate } = authHandler;

    return (<>
        <h1>[Landing]</h1>
        <h1>User: {isAuthenticated ? user.email : 'not authenticated'}</h1>
        {userError && <h1>{`Error: ${userError.message}`}</h1>}

        <button onClick={e => authenticate()}>Authenticate</button><br/>

        <button onClick={e => navigate('/protected')}>Protected</button><br/>
        <button onClick={e => navigate('/authn/logout')}>Logout</button><br/>
    </>)
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