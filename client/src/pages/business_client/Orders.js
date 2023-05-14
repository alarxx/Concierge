import React, {useEffect, useMemo, useState} from 'react';

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';
import BottomControl from "../../shared/ui/bottom_control/BottomControl";
import Button from "../../shared/ui/button/Button";
import Logger from "../../internal/Logger";
import Container from "../../shared/ui/box/Container";
import {useNavigate} from "react-router-dom";
import OrderList from "../../widgets/order/order_list/OrderList";


export default function Orders({}){

    const logger = useMemo(()=>new Logger('Orders'), [])
    const navigate = useNavigate();

    return (<>
        <NavbarPanel title={'Заказы'} />

        <Box navbar={true} menu={true} yummy={true}>
            <Container>

                <OrderList />

            </Container>
        </Box>

        <BottomControl>
            <Button variant={'control'} onClick={e => navigate('/new')}>Добавить заказ</Button>
        </BottomControl>

        <NavigationPanel />
    </>)
}