
import React, {useEffect, useMemo, useState} from 'react';

import {useNavigate, useParams} from "react-router-dom";

import {useAppContext} from "../../../context/AppContext";
import NavbarPanel from "../../../widgets/navbar_panel/NavbarPanel";
import NavigationPanel from "../../../widgets/navigation_panel/NavigationPanel";
import Box from "../../../shared/ui/box/Box";
import Container from "../../../shared/ui/box/Container";
import Accordion from "../../../shared/ui/accordion/Accordion";
import AccordionSummary from "../../../shared/ui/accordion/AccordionSummary";
import Card from "../../../shared/ui/card/Card";
import CardBody from "../../../shared/ui/card/CardBody";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import TriangleIcon from "../../../assets/icons/arrow-down.svg";
import AccordionDetails from "../../../shared/ui/accordion/AccordionDetails";
import EmployeeInfo from "../../../entities/employee/employee_info/EmployeeInfo";
import OrderHotelCard from "../../../widgets/order/order_hotel_card/OrderHotelCard";
import Block from "../../../shared/ui/block/Block";
import NavbarLeft from "../../../shared/ui/navbar/NavbarLeft";
import BackIcon from "../../../assets/icons/backbtn_icon.svg";
import BottomControl from "../../../shared/ui/bottom_control/BottomControl";
import ConciergeAction from "../../../widgets/order/concierge_action/ConciergeAction";
import Button from "../../../shared/ui/button/Button";


export default function OrderInfo({}){

    const [expanded, setExpanded] = useState(null);

    function handleChange(panel) {
        if (expanded === panel) {
            setExpanded(null)
        } else {
            setExpanded(panel)
        }
    }

    const navigate = useNavigate();
    const { id } = useParams();

    const { orderHandler, authHandler } = useAppContext();
    const { orders, extendedOrders, takeOrder } = orderHandler;
    const { user } = authHandler;

    const order = orders.find(order => order.id == id);
    const extendedOrder = extendedOrders.find(order => order.id == id);

    return (<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={e => navigate('/orders')} />}
            title={`Заказ #${id}`}
        />
        <Box navbar={true} menu={true} yummy={true}>
            <Container>

                {/*<Accordion expanded={expanded === 'personal-data'}>*/}
                <Accordion expanded={true}>
                    <AccordionSummary onClick={() => handleChange('personal-data')} >
                        <Card variant='info'>
                            <CardBody>
                                <GroupFlex align='aic' justify='jcsb'>
                                    Контактные данные
                                    <TriangleIcon/>
                                </GroupFlex>
                            </CardBody>
                        </Card>
                    </AccordionSummary>

                    {/*{expanded === 'personal-data' && <AccordionDetails>*/}
                    {<AccordionDetails>
                        <Card variant='info'>
                            <CardBody>
                                <EmployeeInfo name={order.customer.name} phone={order.customer.phone} email={order.customer.email}/>
                            </CardBody>
                        </Card>
                    </AccordionDetails>}
                </Accordion>

                {/*<Accordion expanded={expanded === 'order'}>*/}
                <Accordion expanded={true}>
                    <AccordionSummary onClick={() => handleChange('order')} >
                        <Card variant='info'>
                            <CardBody>
                                <GroupFlex align='aic' justify='jcsb'>
                                    Мой заказ
                                    <TriangleIcon/>
                                </GroupFlex>
                            </CardBody>
                        </Card>
                    </AccordionSummary>

                    {/*{expanded === 'order' && <>*/}
                    {<>
                        <AccordionDetails>
                            {extendedOrder.bookings.map((booking, i) => {
                                if(booking.type === 'hotel/booking') {
                                    return (<div key={i}>
                                        <OrderHotelCard hotelmeta={order.meta.hotel} hotel={booking.hotel} hotel_booking={booking['hotel/booking']}/>
                                    </div>);
                                }
                                else {
                                    return (<p>unknown service type</p>);
                                }
                            })}
                        </AccordionDetails>
                    </>}
                </Accordion>


            </Container>
        </Box>

        <BottomControl>
            {(user.role === 'client' || order.status !== 'new') && <Button variant={'control'} onClick={e=>navigate(`/chat/${order.conversation}`)}>Перейти в чат</Button>}
            {(user.role === 'admin' && order.status === 'new') && <Button variant={'control'} onClick={e => takeOrder(order)}>Принять заказ</Button>}
        </BottomControl>
        <NavigationPanel/>
    </>)
}