import React, { useState, useEffect } from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import ServiceChoice from "../../widgets/service_choice/ServiceChoice";
import Container from "../../shared/ui/box/Container";
import Logo from "../../shared/ui/logo/Logo";
import Block from "../../shared/ui/block/Block";
import ConciergeOrderFlow from "../../widgets/concierge_order_flow/ConciergeOrderFlow";

export default function New(){

    return (
        <>
            <Box menu={true}>
                <Container>
                    <Block top={40} bottom={30}>
                        <Logo />
                    </Block>
                    <ServiceChoice />
                    {/*<ConciergeOrderFlow />*/}
                </Container>
            </Box>
            <NavigationPanel />
        </>
    )
}