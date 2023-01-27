import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

import {useAppContext} from "../context/AppContext";

export default function Home(){
    const {authHandler, socketHandler} = useAppContext();
    const {user, userLoading, userError, isAuthenticated} = authHandler;
    const {isConnected} = socketHandler;

    return (
        <>
            <h1>[Home page]</h1>
            <h3>ENV={process.env.NODE_ENV}</h3>

            {!userLoading && isAuthenticated() && <h2>{user.email}</h2>}
            {!userLoading && !isAuthenticated() && !isConnected && <h2>Disconnected</h2>}
            {userError?.error && <h2>{userError.error}</h2>}
            {userLoading && <p>loading...</p>}

            <nav>
                <li><Link to="/">Home page</Link></li>

                <li><Link to="/profile">Profile</Link></li>

                <li><Link to="/authenticate">Auth</Link></li>
                <li><Link to="/logout">Log Out</Link></li>

                <li><Link to="/chat">Chat</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/partners">Partners</Link></li>

                <li><Link to="/details">Details</Link></li>

            </nav>
        </>
    );
}