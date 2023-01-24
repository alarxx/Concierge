import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";

import {useAppContext} from "../context/AppContext";

export default function Home(){
    const {authHandler, hotelsHandler} = useAppContext();
    const {user, userLoading, isAuthenticated} = authHandler;

    useEffect(()=>{

    }, [])

    return (
        <>
            <h1>[Home page]</h1>

            {!userLoading && isAuthenticated() && <h2>{user.email}</h2>}
            {!userLoading && !isAuthenticated() && <h2>{user?.message}</h2>}
            {userLoading && <h2>Loading...</h2>}

            <nav>
                <li><Link to="/">Home page</Link></li>
                <li><Link to="/test">Test page</Link></li>

                <li><Link to="/profile">Profile</Link></li>

                <li><Link to="/login">Sign in</Link></li>
                <li><Link to="/register">Sign up</Link></li>
                <li><Link to="/auth">Auth</Link></li>
                <li><Link to="/register/simple">Sign up simple</Link></li>
                <li><Link to="/logout">Log Out</Link></li>
                <li><Link to="/chat">Chat</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/partners">Partners</Link></li>
            </nav>
        </>
    );
}