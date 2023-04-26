import React, {Fragment, useEffect, useState} from 'react';
import {useAppContext} from "../context/AppContext";
import {useNavigate} from "react-router-dom";

import Logger from '../internal/Logger';
const logger = new Logger('Logout');

import NavbarPanel from '../widgets/navbar_panel/NavbarPanel';
import Box from '../ui/box/Box'
import NavigationPanel from '../widgets/navigation_panel/NavigationPanel';


export default function Profile({}){

    const navigate = useNavigate();

    const { authHandler } = useAppContext();
    const { logout } = authHandler;

    return (
        <Fragment>
            <NavbarPanel/>
                <Box>

                    <div className="section section-profile">
                        profile
                        <button onClick={async e => {
                            logger.log(await logout());
                            // navigate('/');
                        }}>Logout</button>
                    </div>

                </Box>
            <NavigationPanel />
        </Fragment>
    )
}