import React from 'react'

import Workflow from "../../phone/Workflow";
import Menu from "../../phone/Menu";
import Container from "../../phone/Container";
import Navbar from "../../phone/Navbar";



export default function PartnerDetail(){
    return (
        <Workflow>
            
            <Navbar title={"Информация по партнеру"} select/>

            <Container>

                
                <ServiceItem
                    caption={"Мероприятие"} address={"description"} icon={<HouseSVG />}
                    // active={type === 'event'}
                />

            </Container>

            <Menu />

        </Workflow>
    )
}