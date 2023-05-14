import React, {useEffect, useState} from 'react';

import {useNavigate} from "react-router-dom";

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
import LogoutAction from "../../../widgets/logout_action/LogoutAction";
import {useAppContext} from "../../../context/AppContext";
import CardBody from "../../../shared/ui/card/CardBody";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import Modal from "../../../shared/ui/modal/Modal";
import LogoutForm from "../../../features/auth/logout/LogoutForm";


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

                </Container>
            </Box>
            <NavigationPanel />
        </>
    )
}