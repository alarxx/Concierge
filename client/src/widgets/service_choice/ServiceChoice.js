import React, {useEffect, useState} from "react";

import styles from './serviceChoice.module.css'

import Card from "../../shared/ui/card/Card";
import CardHeader from "../../shared/ui/card/CardHeader";
import Logo from "../../shared/ui/logo/Logo";
import CardBody from "../../shared/ui/card/CardBody";
import NewHotelOrder from "../../entities/order/new_hotel_order/NewHotelOrder";
import NewTransferOrder from "../../entities/order/new_transfer_order/NewTransferOrder";
import Button from "../../shared/ui/button/Button";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";

import IconHotel from '../../assets/icons/service_hotel.svg'
import IconTransfer from '../../assets/icons/service_trancsfer.svg'
import IconTickets from '../../assets/icons/service_tickets.svg'

export default function ServiceChoice() {

    const [activeEl, setActiveEl] = useState(<NewHotelOrder />)
    const [activeTab, setActiveTab] = useState('NewHotelOrder')

    return (<>
        <GroupFlex className={styles.ServiceChoice}>
            <Button variant={activeTab==='NewHotelOrder' ? '' : 'outline'} onClick={()=> {setActiveEl(<NewHotelOrder />); setActiveTab('NewHotelOrder')}}><IconHotel />Отель</Button>
            <Button variant={activeTab==='NewTransferOrder' ? '' : 'outline'} onClick={()=> {setActiveEl(<NewTransferOrder />); setActiveTab('NewTransferOrder')}}><IconTransfer />Трансфер</Button>
            <Button variant={activeTab==='NewTicketsOrder' ? '' : 'outline'} onClick={()=> {setActiveEl(null); setActiveTab('NewTicketsOrder')}}><IconTickets />Билеты</Button>
        </GroupFlex>

        <Card>
            <CardHeader>
                <Logo />
            </CardHeader>

            <CardBody>
                {activeEl}
            </CardBody>
        </Card>

        <Button variant={'outline'}>Создать составной заказ</Button>

    </>)
}