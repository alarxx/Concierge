import React, { Fragment } from 'react';

import NavbarPanel from '../../widgets/navbar_panel/NavbarPanel';
import Box from '../../shared/ui/box/Box'
import NavigationPanel from '../../widgets/navigation_panel/NavigationPanel';
// import MapModal from "../../components/map/Map";

export default function Chat({}){

    return (
        <Fragment>
            <NavbarPanel title={'Чат'}/>
                <Box>
                    <div className="section section-profile">
                        chat
                        {/*<MapModal />*/}
                    </div>
                </Box>
            <NavigationPanel />
        </Fragment>
    )
}