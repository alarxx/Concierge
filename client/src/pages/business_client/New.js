import React, { useState, useEffect } from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import ServiceChoice from "../../widgets/service_choice/ServiceChoice";
import Container from "../../shared/ui/box/Container";
import Logo from "../../shared/ui/logo/Logo";
import Block from "../../shared/ui/block/Block";
import ConciergeOrderFlow from "../../widgets/concierge_order_flow/ConciergeOrderFlow";
import {useAppContext} from "../../context/AppContext";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import AppBar from "../../shared/ui/app_bar/AppBar";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import {useLocation, useNavigate} from "react-router-dom";
const NewPage = () => {
    return (<>
        <Block top={40} bottom={30}>
            <Logo />
        </Block>
        <ServiceChoice />
        {/*<ConciergeOrderFlow />*/}
    </>)
}
export default function New(){

    const { adaptiveHandler } = useAppContext();
    const { device } = adaptiveHandler;

    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (device === 'mobile') {
        return (<>
            <Box menu={true}>
                <Container>
                    <NewPage />
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
                    <NewPage />
                </Container>
            </GroupInline>
        </>)
    }
}