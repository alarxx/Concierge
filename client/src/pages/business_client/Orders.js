import React, {useEffect, useMemo, useState} from 'react';

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';
import BottomControl from "../../shared/ui/bottom_control/BottomControl";
import Button from "../../shared/ui/button/Button";
import Logger from "../../internal/Logger";
import Container from "../../shared/ui/box/Container";
import {useLocation, useNavigate} from "react-router-dom";
import OrderList from "../../widgets/order/order_list/OrderList";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import AppBar from "../../shared/ui/app_bar/AppBar";
import Block from "../../shared/ui/block/Block";
import Logo from "../../shared/ui/logo/Logo";
import Nav from "../../shared/ui/nav/Nav";
import NavLink from "../../shared/ui/nav/NavLink";
import {useAppContext} from "../../context/AppContext";

const OrdersPage = () => {
    return (<>
        <OrderList />
    </>)
}
export default function Orders({}){

    const logger = useMemo(()=>new Logger('Orders'), [])
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { adaptiveHandler } = useAppContext();
    const { device } = adaptiveHandler;

    if (device === 'mobile' || device === 'tablet') {
        return (<>
            <NavbarPanel title={'Заказы'} />
            <Box navbar={true} menu={true} yummy={true}>
                <Container>
                    <OrdersPage />
                </Container>
            </Box>

            <BottomControl>
                <Button variant={'control'} onClick={e => navigate('/new')}>Добавить заказ</Button>
            </BottomControl>

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
                    <OrdersPage />
                </Container>
            </GroupInline>
        </>)
    }
}