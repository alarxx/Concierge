import React, {useEffect, useState} from 'react';
import {useAppContext} from "../../../context/AppContext";
import {useNavigate} from "react-router-dom";

import Logger from '../../../internal/Logger';
const logger = new Logger('Logout');

import NavbarPanel from '../../../widgets/navbar_panel/NavbarPanel';
import Box from '../../../shared/ui/box/Box'
import NavigationPanel from '../../../widgets/navigation_panel/NavigationPanel';
import Container from "../../../shared/ui/box/Container";
import Card from "../../../shared/ui/card/Card";
import CardServiceHeader from "../../../shared/ui/card_service/CardServiceHeader";
import Typography from "../../../shared/ui/typography/Typography";
import Accordion from "../../../shared/ui/accordion/Accordion";
import Block from "../../../shared/ui/block/Block";
import ProfileSet from "./ProfileSet";
import Button from "../../../shared/ui/button/Button";


export default function Profile({}){

    const navigate = useNavigate();

    const { authHandler } = useAppContext();
    const { logout } = authHandler;

    return (
        <>
            <NavbarPanel title={'Сервисы'}/>
            <Box navbar={true} menu={true}>
                <Container>

                    <Card variant={'info'} >
                        <CardServiceHeader>
                            <Typography>KazMunayGaz</Typography>
                            <Typography>БИН: </Typography>
                            <Typography>Level: </Typography>
                        </CardServiceHeader>
                    </Card>

                    <Block top={20}>
                        <ProfileSet />
                    </Block>

                    <Button onClick={async e => {
                        logger.log(await logout());
                        // navigate('/');
                    }}>Выйти из аккаунта</Button>

                </Container>
            </Box>
            <NavigationPanel />
        </>
    )
}