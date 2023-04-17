import React, {useEffect, useState} from 'react';
import {useAppContext} from "../../../context/AppContext";
import {useNavigate} from "react-router-dom";

import Logger from '../../../internal/Logger';
const logger = new Logger('Logout');

export default function Logout(){

    const navigate = useNavigate();

    const { authHandler } = useAppContext();
    const { logout } = authHandler;

    return (<>
        <h1>[Logout page]</h1>

        <button onClick={async e => {
            logger.log(await logout());
            navigate('/');
        }}>Logout</button>
    </>);
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