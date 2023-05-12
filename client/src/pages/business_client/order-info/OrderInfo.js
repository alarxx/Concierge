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

    const { orderHandler, } = useAppContext();
    const { orders, ordersLoading, takeOrder } = orderHandler;

    return (<>
        <NavbarPanel
            LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={f=>f} />}
            title={`Заказ #${id}`}
        />
        <Box navbar={true} menu={true}>
            <Container>

                <Accordion expanded={expanded === 'personal-data'}>
                    <AccordionSummary onClick={() => handleChange('personal-data')} >
                        <Card variant='info'>
                            <CardBody>
                                <GroupFlex align='aic' justify='jcsb'>
                                    Ваши данные
                                    <TriangleIcon/>
                                </GroupFlex>
                            </CardBody>
                        </Card>
                    </AccordionSummary>

                    {expanded === 'personal-data' && <AccordionDetails>
                        <Card variant='info'>
                            <CardBody>
                                <EmployeeInfo/>
                            </CardBody>
                        </Card>
                    </AccordionDetails>}
                </Accordion>

                <Accordion expanded={expanded === 'order'}>
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

                    {expanded === 'order' && <AccordionDetails>
                        <OrderHotelCard/>
                        <OrderHotelCard/>
                    </AccordionDetails>}
                </Accordion>


            </Container>
        </Box>
        <NavigationPanel/>
    </>)
}