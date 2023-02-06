import React from 'react'

import Workflow from "../../components/phone/Workflow";
import Menu from "../../components/phone/Menu";
import Workspace from "../../components/phone/Workspace";
import Navbar from "../../components/phone/Navbar";
import CardOrder from "../../components/cards/CardOrder";
import PushIcon from "../../assets/icons/clipboard-tick.svg";

import ServicesPanel from "../../components/partners/ServicesPanel"


export default function Partners(){
    return (
        <Workflow>
            
            <Navbar title={"Партнеры"} select/>

            <Workspace>

                <ServicesPanel />

            </Workspace>

            <Menu />

        </Workflow>
    )
}