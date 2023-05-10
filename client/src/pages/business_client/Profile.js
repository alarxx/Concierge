import React, {useEffect, useState} from 'react';
import {useAppContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";

import Logger from '../../internal/Logger';
const logger = new Logger('Logout');

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';
import Container from "../../shared/ui/box/Container";


export default function Profile({}){

    const navigate = useNavigate();

    const { authHandler } = useAppContext();
    const { logout } = authHandler;

    return (
        <>
            <NavbarPanel title={'Сервисы'}/>
            <Box navbar={true} menu={true}>

                <Container>
                    profile
                    <button onClick={async e => {
                        logger.log(await logout());
                        // navigate('/');
                    }}>Logout</button>
                </Container>

            </Box>
            <NavigationPanel />
        </>
    )
}