import React, { useState, useEffect } from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import ServiceChoice from "../../widgets/service_choice/ServiceChoice";
import Container from "../../shared/ui/box/Container";

export default function New(){

    return (
        <>
            <Box menu={true}>
                <Container>
                    <ServiceChoice />
                </Container>
            </Box>
            <NavigationPanel />
        </>
    )
}