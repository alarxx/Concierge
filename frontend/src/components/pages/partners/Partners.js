import React from 'react'

import Workflow from "../../phone/Workflow";
import Menu from "../../phone/Menu";
import Container from "../../phone/Container";
import Navbar from "../../phone/Navbar";
import CardOrder from "../../cards/CardOrder";
import PushIcon from "../../../icons/clipboard-tick.svg";

import ServicesPanel from "../../partners/ServicesPanel"


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