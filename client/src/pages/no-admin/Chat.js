import React, { Fragment } from 'react';

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';

export default function Chat({}){

    return (
        <Fragment>
            <NavbarPanel/>
                <Box>
                    <div className="section section-profile">
                        chat
                    </div>
                </Box>
            <NavigationPanel />
        </Fragment>
    )
}