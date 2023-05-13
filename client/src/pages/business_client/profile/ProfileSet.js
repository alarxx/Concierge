import React, {useEffect, useState} from 'react';

import NavbarPanel from '../../../widgets/navbar_panel/NavbarPanel';
import Box from '../../../shared/ui/box/Box'
import NavigationPanel from '../../../widgets/navigation_panel/NavigationPanel';
import Container from "../../../shared/ui/box/Container";
import Card from "../../../shared/ui/card/Card";
import CardServiceHeader from "../../../shared/ui/card_service/CardServiceHeader";
import Typography from "../../../shared/ui/typography/Typography";
import Accordion from "../../../shared/ui/accordion/Accordion";
import AccordionSummary from "../../../shared/ui/accordion/AccordionSummary";
import CardBody from "../../../shared/ui/card/CardBody";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import AccordionDetails from "../../../shared/ui/accordion/AccordionDetails";
import EmployeeInfo from "../../../entities/employee/employee_info/EmployeeInfo";
import SendResetPasswordMail from "../../../features/auth/password_send_reset/SendResetPasswordMail";

import TriangleIcon from '../../../assets/icons/arrow-down.svg'
export default function ProfileSet({ user }){

    const [expanded, setExpanded] = useState(null);

    function handleChange(panel) {
        if (expanded === panel) {
            setExpanded(null)
        } else {
            setExpanded(panel)
        }
    }

    return (
        <>
            {user.role === 'admin' && <>
                <Accordion expanded={expanded === 'travel-policy'}>
                    <AccordionSummary onClick={() => handleChange('travel-policy')} >
                        <Card variant='info'>
                            <CardBody>
                                <GroupFlex align='aic' justify='jcsb'>
                                    Travel-политики
                                    <TriangleIcon/>
                                </GroupFlex>
                            </CardBody>
                        </Card>
                    </AccordionSummary>

                    {expanded === 'travel-policy' && <>
                        <AccordionDetails>
                            <Card variant='info'>
                                <CardBody>
                                    Travel-политика
                                </CardBody>
                            </Card>
                        </AccordionDetails>
                    </>}
                </Accordion>

                <Accordion expanded={expanded === 'employees'}>
                    <AccordionSummary onClick={() => handleChange('employees')} >
                        <Card variant='info'>
                            <CardBody>
                                <GroupFlex align='aic' justify='jcsb'>
                                    Сотрудники
                                    <TriangleIcon/>
                                </GroupFlex>
                            </CardBody>
                        </Card>
                    </AccordionSummary>

                    {expanded === 'employees' && <>
                        <AccordionDetails>
                            <Card variant='info'>
                                <CardBody>
                                    <EmployeeInfo />
                                </CardBody>
                            </Card>
                        </AccordionDetails>
                    </>}
                </Accordion>
            </>}

            <Accordion expanded={expanded === 'change-password'}>
                <AccordionSummary onClick={() => handleChange('change-password')} >
                    <Card variant='info'>
                        <CardBody>
                            <GroupFlex align='aic' justify='jcsb'>
                                Сменить пароль
                                <TriangleIcon/>
                            </GroupFlex>
                        </CardBody>
                    </Card>
                </AccordionSummary>

                {expanded === 'change-password' &&
                    <AccordionDetails>
                        <Card variant='info'>
                            <CardBody>
                                <SendResetPasswordMail />
                            </CardBody>
                        </Card>
                    </AccordionDetails>
                }
            </Accordion>
        </>
    )
}