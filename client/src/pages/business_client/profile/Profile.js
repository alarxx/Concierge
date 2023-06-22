import React, {useEffect, useState} from 'react';

import {useLocation, useNavigate} from "react-router-dom";
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
import BottomControl from "../../../shared/ui/bottom_control/BottomControl";
import GroupInline from "../../../shared/ui/group_inline/GroupInline";
import AppBar from "../../../shared/ui/app_bar/AppBar";
import Logo from "../../../shared/ui/logo/Logo";
import Nav from "../../../shared/ui/nav/Nav";
import NavLink from "../../../shared/ui/nav/NavLink";

const ProfilePage = () => {

    const navigate = useNavigate();
    const { authHandler } = useAppContext();
    const { user } = authHandler;

    return (<>
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
    </>)
}

export default function Profile({}){

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { adaptiveHandler } = useAppContext();
    const { device } = adaptiveHandler;

    if (device === 'mobile' || device === 'tablet') {
        return (<>
            <NavbarPanel title={'Сервисы'}/>

            <Box navbar={true} menu={true}>
                <Container>
                    <ProfilePage />
                </Container>
            </Box>

            <NavigationPanel />
        </>)
    } else {
        return (<>
            <GroupInline width={'100%'} height={'100%'}>
                <AppBar left={true} isClientView={true}>
                    <Block>
                        <Logo/>
                        <Block top={80} isAlignCenter={true}>
                            <Nav block={true}>
                                <NavLink active={pathname.startsWith('/new')} text={'Главная'} onClick={e => navigate('/new', {replace: true,})}/>
                                <NavLink active={pathname.startsWith('/orders')} text={'Заказы'} onClick={e => navigate('/orders', {replace: true,})}/>
                                <NavLink active={pathname.startsWith('/chat')} text={'Чат'} onClick={e => navigate('/chat', {replace: true,})}/>
                                <NavLink active={pathname.startsWith('/profile')} text={'Сервисы'} onClick={e => navigate('/profile', {replace: true,})}/>
                            </Nav>
                        </Block>
                    </Block>
                </AppBar>
                <Container padding={'20px'}>
                    <ProfilePage />
                </Container>
            </GroupInline>
        </>)
    }
}