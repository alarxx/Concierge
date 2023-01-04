import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Logout({auth}){
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
