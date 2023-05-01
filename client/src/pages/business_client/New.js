import React, { useState, useEffect } from 'react';

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import Card from '../../shared/ui/card/Card';
import CardHeader from '../../shared/ui/card/CardHeader';
import Logo from '../../shared/ui/logo/Logo';
import CardBody from '../../shared/ui/card/CardBody';
import CardFooter from '../../shared/ui/card/CardFooter';
import Button from '../../shared/ui/button/Button';
import ButtonCircle from '../../shared/ui/button_circle/ButtonCircle';
import GroupButtons from '../../shared/ui/group_buttons/GroupButtons';

import NewHotelOrder from '../../entities/order/new_hotel_order/NewHotelOrder'
import NewTransferOrder from '../../entities/order/new_transfer_order/NewTransferOrder'
import ServiceChoice from "../../widgets/service_choice/ServiceChoice";

export default function New({}){


    return (
        <>
            <NavbarPanel title={'Главная'}/>
                <Box variant='center'>
                    <ServiceChoice />
                </Box>
            <NavigationPanel />
        </>
    )
}