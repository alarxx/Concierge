import React, { Fragment } from 'react';

import NavbarPanel from '../widgets/navbar_panel/NavbarPanel';
import Box from '../ui/box/Box'
import NavigationPanel from '../widgets/navigation_panel/NavigationPanel';


export default function Profile({}){

    return (
        <Fragment>
            <NavbarPanel/>
                <Box>

                    <div className="section section-profile">
                        profile
                    </div>

                </Box>
            <NavigationPanel />
        </Fragment>
    )
}