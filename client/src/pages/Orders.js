import React, { useEffect } from 'react';

import Accordion from '../ui/accordion/Accordion'
import AccordionSummary from '../ui/accordion/AccordionSummary'
import AccordionDetails from '../ui/accordion/AccordionDetails'
import Card from '../ui/card/Card';
import CardBody from '../ui/card/CardBody';


export default function Orders({}){

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => {
        console.log('onChangeeeeee', panel)
        setExpanded(panel);
    };

    return (
            <div className="section section-profile">
                orders
                <Accordion expanded={expanded === 'panel1'} onClick={() => handleChange('panel1')} >
                    <AccordionSummary>
                        <Card><CardBody>AccordionSummary11111</CardBody></Card>
                    </AccordionSummary>
                    {
                        expanded === 'panel1' && (
                            <AccordionDetails>
                                <Card><CardBody>AccordionDetails1111</CardBody></Card>
                            </AccordionDetails>
                        )
                    }
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onClick={() => handleChange('panel2')} >
                    <AccordionSummary>
                        <Card><CardBody>AccordionSummary2222</CardBody></Card>
                    </AccordionSummary>
                    {
                        expanded === 'panel2' && (
                            <AccordionDetails>
                                <Card><CardBody>AccordionDetails22222</CardBody></Card>
                            </AccordionDetails>
                        )
                    }
                </Accordion>
            </div>
    )
}