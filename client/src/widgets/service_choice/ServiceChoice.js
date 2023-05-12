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
import Badge from "../../shared/ui/badge/Badge";
import Modal from "../../shared/ui/modal/Modal";
import ConciergeServiceForm from "../../features/order/concierge_service_form/ConciergeServiceForm";
import ComingSoon from "../../features/order/coming_soon/ComingSoon";

export default function ServiceChoice() {
    const location = useLocation();

    const [data, setData] = useState(() => location.state?.data ? location.state.data : {});

    function upsertFields(fields){
        setData(prev => ({...prev, ...fields}));
    }

    const [activeTab, setActiveTab] = useState('NewHotelOrder');

    const [isModalActive, setIsModalActive] = useState(false);

    return (<>
        <GroupFlex className={styles.ServiceChoice}>

            <Button variant={activeTab==='NewHotelOrder' ? '' : 'outline'} onClick={()=>setActiveTab('NewHotelOrder')}>
                <IconHotel />Отель
            </Button>

            <Button badge={true} variant={activeTab==='NewTransferOrder' ? '' : 'outline'} onClick={()=>setActiveTab('NewTransferOrder')}>
                <IconTransfer />Трансфер
                <Badge air={true} bottom={-15} text={'Скоро'}/>
            </Button>

            <Button badge={true} variant={activeTab==='NewTicketsOrder' ? '' : 'outline'} onClick={()=>setActiveTab('NewTicketsOrder')}>
                <IconTickets />Авиабилеты
                <Badge air={true} bottom={-15} text={'Скоро'}/>
            </Button>

        </GroupFlex>

        <Card>
            <CardBody>
                {activeTab==='NewHotelOrder' && <NewHotelOrder data={data} upsertFields={upsertFields} />}

                {activeTab==='NewTicketsOrder' && <>
                    <NewHotelOrder data={data} upsertFields={upsertFields} />

                    <Modal minWidth={360} maxWidth={400} onClose={e => setActiveTab('NewHotelOrder')}>
                        <ComingSoon cancelClick={e => setActiveTab('NewHotelOrder')} />
                    </Modal>
                </>}

                {activeTab==='NewTransferOrder' && <>
                    <NewHotelOrder data={data} upsertFields={upsertFields} />

                    <Modal minWidth={360} maxWidth={400} onClose={e => setActiveTab('NewHotelOrder')}>
                        <ComingSoon cancelClick={e => setActiveTab('NewHotelOrder')} />
                    </Modal>
                </>}

            </CardBody>
        </Card>

        <Button top={20} variant={'outline'}>Создать составной заказ</Button>

    </>)
}