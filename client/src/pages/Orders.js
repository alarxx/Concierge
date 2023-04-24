import React, { useEffect } from 'react';

import Accordion from '../ui/accordion/Accordion'
import AccordionSummary from '../ui/accordion/AccordionSummary'
import AccordionDetails from '../ui/accordion/AccordionDetails'
import Card from '../ui/card/Card';
import CardBody from '../ui/card/CardBody';
import GroupFlex from '../ui/group_flex/GroupFlex'
import EmployeeInfo from '../entities/employee/employee_info/EmployeeInfo'

import TriangleIcon from '../assets/icons/drop-down-info.svg';


export default function Orders({}){

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => {
        console.log('onChangeeeeee', panel)
        panel === expanded ? setExpanded(false) : setExpanded(panel)
    };

    return (
            <div className="section section-profile">
                orders
                <Accordion expanded={expanded === 'panel1'} onClick={() => handleChange('panel1')} >
                    <AccordionSummary>
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
                <Accordion expanded={expanded === 'panel12'} onClick={() => handleChange('panel12')} >
                    <AccordionSummary>
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

                <Accordion expanded={expanded === 'panel13'} onClick={() => handleChange('panel13')} >
                    <AccordionSummary>
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
    )
}