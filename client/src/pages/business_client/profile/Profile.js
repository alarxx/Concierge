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
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";


export default function Profile({}){

    const navigate = useNavigate();
    const { authHandler } = useAppContext();
    const { user } = authHandler;

    useEffect(()=> {
        console.log(user)
    })

    return (
        <>
            <NavbarPanel title={'Сервисы'}/>
            <Box navbar={true} menu={true}>
                <Container>
                    <Card variant={'info'} >
                        <CardServiceHeader>
                            <Typography bottom={15} size={21} weight={600}>Персональная информация</Typography>
                            <GroupFlex>
                                <div><Typography>Почта:</Typography></div>
                                <div><Typography weight={600}>{user.email}</Typography></div>
                            </GroupFlex>
                            <GroupFlex>
                                <Typography>Имя:</Typography>
                                <div><Typography weight={600}>{user.name}</Typography></div>
                            </GroupFlex>
                            <GroupFlex>
                                <div><Typography>Номер телефона:</Typography></div>
                                <div><Typography weight={600}>{user.phone}</Typography></div>
                            </GroupFlex>
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