import React from 'react'

import Workflow from "../../components/phone/Workflow";
import Menu from "../../components/phone/Menu";
import Workspace from "../../components/phone/Workspace";
import Navbar from "../../components/phone/Navbar";



export default function PartnerDetail(){
    return (
        <Workflow>
            
            <Navbar title={"Информация по партнеру"} select/>

            <Workspace>

                
                <ServiceItem
                    caption={"Мероприятие"} address={"description"} icon={<HouseSVG />}
                    // active={type === 'event'}
                />

            </Workspace>

            <Menu />

        </Workflow>
    )
}