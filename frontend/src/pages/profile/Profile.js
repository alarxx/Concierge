import React from 'react'
import Workflow from "../../components/phone/Workflow";
import Workspace from "../../components/phone/Workspace";
import Menu from "../../components/phone/Menu";

export default function Profile(){
    return (
        <Workflow>

            <Workspace>
                <h1>[Profile page]</h1>
            </Workspace>

            <Menu />
        </Workflow>
    );
}