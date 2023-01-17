import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from "../../context/hooks/useAuth";

export default function Logout(){
    const navigate = useNavigate();

    const onLogout = () => {
        console.log('logout')
        auth.logout();
        navigate('/', {replace: true});
    }

    return (
        <button onClick={onLogout}>Logout</button>
    );
}
