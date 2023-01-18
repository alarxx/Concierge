import React from 'react'

import Workflow from "../../components/phone/Workflow";
import Menu from "../../components/phone/Menu";
import Container from "../../components/phone/Container";
import Navbar from "../../components/phone/Navbar";
import CardOrder from "../../components/cards/CardOrder";
import PushIcon from "../../assets/icons/clipboard-tick.svg";

import ServicesPanel from "../../components/partners/ServicesPanel"


export default function Partners(){
    return (
        <Workflow>
            
            <Navbar title={"Партнеры"} select/>

            <Container>

                <ServicesPanel />

            </Container>

            <Menu />

        </Workflow>
    )
}