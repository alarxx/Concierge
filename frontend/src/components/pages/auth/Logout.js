import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from "../../context/hooks/useAuth";
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
        <button onClick={onLogout}>Logout</button>
    );
}
