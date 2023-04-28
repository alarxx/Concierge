import React, { Fragment, useEffect } from 'react';

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

export default function Orders({}){

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => {
        console.log('onChangeeeeee', panel)
        panel === expanded ? setExpanded(false) : setExpanded(panel)
    };

    return (
        <Fragment>
            <NavbarPanel title={'Заказы'} />
            <Box>
                <div className="section section-profile">
                    orders
                    <Accordion expanded={expanded === 'panel1'}>
                        <AccordionSummary onClick={() => handleChange('panel1')} >
                            <Card variant='info'>
                                <CardBody>
                                    <GroupFlex align='aic' justify='jcsb'>
                                        AccordionSummary11111
                                        <TriangleIcon/>
                                    </GroupFlex>
                                </CardBody>
                            </Card>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Card variant='info'>
                                <CardBody>
                                    <EmployeeInfo />
                                </CardBody>
                            </Card>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel12'}>
                        <AccordionSummary onClick={() => handleChange('panel12')} >
                            <Card variant='info'>
                                <CardBody>
                                    <GroupFlex align='aic' justify='jcsb'>
                                        AccordionSummary11111
                                        <TriangleIcon/>
                                    </GroupFlex>
                                </CardBody>
                            </Card>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Card variant='info'>
                                <CardBody>
                                    AccordionDetails1111
                                </CardBody>
                            </Card>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel13'} >
                        <AccordionSummary onClick={() => handleChange('panel13')} >
                            <Card variant='info'>
                                <CardBody>
                                    <GroupFlex align='aic' justify='jcsb'>
                                        AccordionSummary11111
                                        <TriangleIcon/>
                                    </GroupFlex>
                                </CardBody>
                            </Card>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Card variant='info'>
                                <CardBody>
                                    AccordionDetails1111
                                </CardBody>
                            </Card>
                        </AccordionDetails>
                    </Accordion>

                </div>
            </Box>
            <BottomControl>
                <Button variant={'control'} size={'big'} onClick={f=>f}>Заказать услугу</Button>
            </BottomControl>
            <NavigationPanel />
        </Fragment>
    )
}