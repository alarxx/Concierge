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


export default function Orders({}){


    return (<>
        <NavbarPanel title={'Заказы'} />
        <Box>
            <div className="section section-profile">
                orders

                <HotelMealsChoice />


                {/*<Accordion expanded={expanded === 'panel1'}>*/}
                {/*    <AccordionSummary onClick={() => handleChange('panel1')} >*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                <GroupFlex align='aic' justify='jcsb'>*/}
                {/*                    AccordionSummary11111*/}
                {/*                    <TriangleIcon/>*/}
                {/*                </GroupFlex>*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionSummary>*/}
                {/*    <AccordionDetails>*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                <EmployeeInfo />*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}
                {/*<Accordion expanded={expanded === 'panel12'}>*/}
                {/*    <AccordionSummary onClick={() => handleChange('panel12')} >*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                <GroupFlex align='aic' justify='jcsb'>*/}
                {/*                    Командировка #000421*/}
                {/*                    <TriangleIcon/>*/}
                {/*                </GroupFlex>*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionSummary>*/}
                {/*    <AccordionDetails>*/}
                {/*        <Configurator />*/}
                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}

                {/*<Accordion expanded={expanded === 'panel13'} >*/}
                {/*    <AccordionSummary onClick={() => handleChange('panel13')} >*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                <GroupFlex align='aic' justify='jcsb'>*/}
                {/*                    AccordionSummary11111*/}
                {/*                    <TriangleIcon/>*/}
                {/*                </GroupFlex>*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionSummary>*/}
                {/*    <AccordionDetails>*/}
                {/*        <Card variant='info'>*/}
                {/*            <CardBody>*/}
                {/*                AccordionDetails1111*/}
                {/*            </CardBody>*/}
                {/*        </Card>*/}
                {/*    </AccordionDetails>*/}
                {/*</Accordion>*/}

            </div>
        </Box>
        <NavigationPanel />
    </>)
}