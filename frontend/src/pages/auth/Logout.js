import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import Workspace from "../../components/phone/Workspace";
import Menu from "../../components/phone/Menu";
import Workflow from "../../components/phone/Workflow";

export default function Logout(){
    const navigate = useNavigate();
    const {authHandler} = useAppContext()
    const {logout} = authHandler;

    const onLogout = () => {
        console.log('logout')
        logout();
        navigate('/', {replace: true});
    }

    return (
    <Workflow>

        <Workspace>
            <h1>[Logout page]</h1>

            <button onClick={onLogout}>Logout</button>

        </Workspace>

        <Menu />
    </Workflow>
    );
}