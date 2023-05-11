import React, {useEffect, useMemo, useState} from 'react';

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import Accordion from '../../shared/ui/accordion/Accordion'
import AccordionSummary from '../../shared/ui/accordion/AccordionSummary'
import AccordionDetails from '../../shared/ui/accordion/AccordionDetails'
import Card from '../../shared/ui/card/Card';
import CardBody from '../../shared/ui/card/CardBody';
import GroupFlex from '../../shared/ui/group_flex/GroupFlex'
import EmployeeInfo from '../../entities/employee/employee_info/EmployeeInfo'

import TriangleIcon from '../../assets/icons/drop-down-info.svg';
import BottomControl from "../../shared/ui/bottom_control/BottomControl";
import Button from "../../shared/ui/button/Button";
import HotelCard from "../../widgets/hotel/hotel_card/HotelCard";
import Configurator from "../../widgets/configurator/Configurator";
import Logger from "../../internal/Logger";
import useBigList from "../../hooks/useBigList";
import HotelMealsChoice from "../../widgets/hotel/hotel_meals_choice/HotelMealsChoice";
import OrderCard from "../../widgets/order/order_card/OrderCard";
import Container from "../../shared/ui/box/Container";


export default function Orders({}){


    return (<>
        <NavbarPanel title={'Заказы'} />
        <Box navbar={true} menu={true} yummy={true}>

            <Container>

                <OrderCard />
                <OrderCard />
                <OrderCard />

            </Container>

        </Box>
        <BottomControl>
            <Button variant={'control'}>Добавить заказ</Button>
        </BottomControl>
        <NavigationPanel />
    </>)
}