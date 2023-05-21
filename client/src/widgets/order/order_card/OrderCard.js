import React, {useEffect, useMemo} from 'react'

import {useNavigate} from "react-router-dom";
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
import Button from "../../../shared/ui/button/Button";
import dateRange from "../../../internal/order/dateRange_toString";
import numberOfPeople from "../../../internal/order/numberOfPeople_toString";

export default function OrderCard({ order={} }) {
    const logger = useMemo(()=>new Logger('OrderCard'), []);

    const navigate = useNavigate();

    const {authHandler} = useAppContext();
    const {user} = authHandler;

    const orderInfo = getOrderInfo(order);

    return(<>
        <CardService onClick={f=>f} isGrid={true} cursor={'default'}>

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
                        <Typography size={14} weight={500} bottom={2}>{dateRange(order.meta?.hotel?.check_in_date, order.meta?.hotel?.check_out_date)} - {numberOfPeople(order.meta?.hotel?.number_of_adults, order.meta?.hotel?.number_of_children)}</Typography>
                    </div>
                    <div>
                        <Typography size={14} weight={500} bottom={2} color={'#959BA1'}>{orderInfo.description}</Typography>
                    </div>
                </Block>

                <Block top={20}>
                    <GroupFlex>

                        <Block right={10}>
                            <Button variant={'outline'} size={'small'} onClick={e=>navigate(`/orders/${order.id}`)}>Подробнее</Button>
                        </Block>

                        {(user.role === 'client' || (user.role === 'admin' && order.status !== 'new')) &&
                            <Block>
                                <Button size={'small'} onClick={e=>navigate(`/chat/${order.conversation}`)}>Перейти в чат</Button>
                            </Block>
                        }
                    </GroupFlex>
                </Block>
            </CardBody>

        </CardService>
    </>)
}