import React, { useState, useEffect } from 'react';

import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

import ServiceChoice from "../../widgets/service_choice/ServiceChoice";

export default function New(){

    return (
        <>
            <Box>
                <ServiceChoice />
            </Box>
            <NavigationPanel />
        </>
    )
}