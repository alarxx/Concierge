import React from 'react'
import Workflow from "../../components/phone/Workflow";
import Workspace from "../../components/phone/Workspace";
import Menu from "../../components/phone/Menu";
import {Link} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";

export default function Profile(){

    const {authHandler, socketHandler, adaptiveHandler} = useAppContext();
    const {user, userLoading, userError, isAuthenticated} = authHandler;
    const {isConnected} = socketHandler;

    const { device } = adaptiveHandler;

    return (
        <Workflow>

            <Workspace>
                <h1>[Profile page]</h1>

                <h2>{device}</h2>

                {!userLoading && isAuthenticated() && <h2>{user.email}</h2>}
                {!userLoading && !isAuthenticated() && !isConnected && <h2>Disconnected</h2>}
                {userError?.error && <h2>{userError.error}</h2>}
                {userLoading && <p>loading...</p>}

                <nav>
                    <li><Link to="/">Home page</Link></li>
                    <li><Link to="/admin">Admin page</Link></li>

                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/main">Main</Link></li>

                    <li><Link to="/authenticate">Auth</Link></li>
                    <li><Link to="/logout">Log Out</Link></li>

                    <li><Link to="/chat">Chat</Link></li>
                    <li><Link to="/order">Order</Link></li>
                    <li><Link to="/partners">Partners</Link></li>

                    <li><Link to="/details">Details</Link></li>

                </nav>
            </Workspace>

            <Menu />
        </Workflow>
    );
}