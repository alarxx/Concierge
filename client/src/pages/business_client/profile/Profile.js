import React, {useEffect, useState} from 'react';

import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";

import version from '../../../../version.json';

import NavbarPanel from '../../../widgets/navbar_panel/NavbarPanel';
import Box from '../../../shared/ui/box/Box'
import NavigationPanel from '../../../widgets/navigation_panel/NavigationPanel';
import Container from "../../../shared/ui/box/Container";
import Card from "../../../shared/ui/card/Card";
import CardServiceHeader from "../../../shared/ui/card_service/CardServiceHeader";
import Typography from "../../../shared/ui/typography/Typography";
import Block from "../../../shared/ui/block/Block";
import ProfileSet from "./ProfileSet";
import Button from "../../../shared/ui/button/Button";
import LogoutAction from "../../../widgets/logout_action/LogoutAction";


export default function Profile({}){

    const navigate = useNavigate();
    const { authHandler } = useAppContext();
    const { user } = authHandler;

    return (
        <>
            <NavbarPanel title={'Сервисы'}/>
            <Box navbar={true} menu={true}>
                <Container>

                    <Card variant={'info'} >
                        <CardServiceHeader>
                            <Typography>email: {user.email}</Typography>
                            {/*<Typography>KazMunayGaz</Typography>*/}
                            {/*<Typography>БИН: </Typography>*/}
                            {/*<Typography>Level: </Typography>*/}
                        </CardServiceHeader>
                    </Card>

                    <Block top={20}>
                        <ProfileSet user={user}/>
                    </Block>

                    {user.role === 'admin' && <>
                        <Block bottom={10}>
                            <Button onClick={e=>navigate('/admin')}>Админ панель</Button>
                        </Block>
                    </>}

                    <LogoutAction />

                    <Block top={10}>
                        <Typography size={14} color={'grey'} align={'center'}>v{version.version}</Typography>
                    </Block>

                </Container>
            </Box>
            <NavigationPanel />
        </>
    )
}