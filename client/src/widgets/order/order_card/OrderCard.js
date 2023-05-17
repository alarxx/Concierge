import React, {useEffect, useMemo} from 'react'

import {useAppContext} from "../../../context/AppContext";

import Card from "../../../shared/ui/card/Card";
import CardServiceHeader from "../../../shared/ui/card_service/CardServiceHeader";
import CardServiceBody from "../../../shared/ui/card_service/CardServiceBody";
import CardServiceFooter from "../../../shared/ui/card_service/CardServiceFooter";
import Typography from "../../../shared/ui/typography/Typography";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonLike from "../../../shared/ui/button_like/ButtonLike";
import CardService from "../../../shared/ui/card_service/CardService";
import Gallery from "../../../shared/ui/gallery/Gallery";
import Stars from "../../../shared/ui/stars/Stars";
import Chip from "../../../shared/ui/chip/Chip";
import CardHeader from "../../../shared/ui/card/CardHeader";
import CardBody from "../../../shared/ui/card/CardBody";
import Logger from "../../../internal/Logger";

import getOrderInfo from "../../../internal/order/getOrderInfo";
import getBookingInfo from "../../../internal/order/getBookingInfo";
import Block from "../../../shared/ui/block/Block";

export default function OrderCard({ order={}, onClick=f=>f }) {
    const logger = useMemo(()=>new Logger('OrderCard'), []);

    const {orderHandler, authHandler} = useAppContext();
    const {user} = authHandler;
    const {extendedOrders} = orderHandler;

    // const extendedOrder = extendedOrders.find(eo => eo.id === order.id);
    // const firstBookingInfo = getBookingInfo(extendedOrder.bookings[0], extendedOrder);
    const orderInfo = getOrderInfo(order);

    return(<>
        <CardService onClick={onClick} isGrid={true}>

            <CardBody>
                <GroupFlex align={'ais'} justify={'jcsb'}>
                    <div>
                        <div><Typography size={16} weight={600} bottom={2}>{orderInfo.name}</Typography></div>
                        <div> <Typography size={16} weight={600} bottom={4} color={'#959BA1'}>Заказ #{orderInfo.last4IDDigits}</Typography></div>
                        {user.role === 'admin' && <>
                            <div><Typography size={16} weight={600} bottom={4} color={'#959BA1'}>{orderInfo.customerName}</Typography></div>
                        </>}
                    </div>
                    <Chip text={orderInfo.status.text} variant={orderInfo.status.variant} />
                </GroupFlex>

                <Block top={20}>
                    <div>
                        <Typography size={14} weight={500} bottom={2}>{orderInfo.start_date} - {orderInfo.final_date} - {orderInfo.number_of_adults}</Typography>
                    </div>
                    <div>
                        <Typography size={14} weight={500} bottom={2} color={'#959BA1'}>{orderInfo.description}</Typography>
                    </div>
                </Block>
            </CardBody>

        </CardService>
    </>)
}