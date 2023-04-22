import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";


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
        <>
            <h1>[Logout page]</h1>

            <button onClick={onLogout}>Logout</button>
        </>

    );
}