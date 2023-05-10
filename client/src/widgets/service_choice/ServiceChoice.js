import React, {useEffect, useState} from "react";

import {useLocation} from "react-router-dom";

import styles from './serviceChoice.module.css';

import NewHotelOrder from "../../entities/order/new/NewHotelOrder";
import NewTicketsOrder from "../../entities/order/new/NewTicketsOrder";
import NewTransferOrder from "../../entities/order/new/NewTransferOrder";

import Card from "../../shared/ui/card/Card";
import CardHeader from "../../shared/ui/card/CardHeader";
import Logo from "../../shared/ui/logo/Logo";
import CardBody from "../../shared/ui/card/CardBody";
import Button from "../../shared/ui/button/Button";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";

import IconHotel from '../../assets/icons/service_hotel.svg'
import IconTransfer from '../../assets/icons/service_trancsfer.svg'
import IconTickets from '../../assets/icons/service_tickets.svg'

export default function ServiceChoice() {
    const location = useLocation();

    const [data, setData] = useState(() => location.state?.data ? location.state.data : {});

    function upsertFields(fields){
        setData(prev => ({...prev, ...fields}));
    }

    const [activeTab, setActiveTab] = useState('NewHotelOrder');


    return (<>
        <GroupFlex className={styles.ServiceChoice}>

            <Button variant={activeTab==='NewHotelOrder' ? '' : 'outline'} onClick={()=>setActiveTab('NewHotelOrder')}>
                <IconHotel />Отель
            </Button>

            <Button variant={activeTab==='NewTicketsOrder' ? '' : 'outline'} onClick={()=>setActiveTab('NewTicketsOrder')}>
                <IconTickets />Билеты
            </Button>

            <Button variant={activeTab==='NewTransferOrder' ? '' : 'outline'} onClick={()=>setActiveTab('NewTransferOrder')}>
                <IconTransfer />Трансфер
            </Button>

        </GroupFlex>

        <Card>
            <CardHeader>
                <Logo />
            </CardHeader>

            <CardBody>
                {activeTab==='NewHotelOrder' && <NewHotelOrder data={data} upsertFields={upsertFields} />}
                {activeTab==='NewTicketsOrder' && <NewTicketsOrder data={data} upsertFields={upsertFields} />}
                {/*{activeTab==='NewTransferOrder' && <NewTransferOrder data={data} upsertFields={upsertFields} />}*/}
            </CardBody>
        </Card>

        <Button top={20} variant={'outline'}>Создать составной заказ</Button>

    </>)
}