import React from 'react'

import Workflow from "../../components/phone/Workflow";
import Menu from "../../components/phone/Menu";
import Container from "../../components/phone/Container";
import Navbar from "../../components/phone/Navbar";



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