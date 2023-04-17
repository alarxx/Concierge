import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";

export default function Test(){
    const navigate = useNavigate();
    const {socketHandler, authHandler, URLStateHandler} = useAppContext();
    const {setState, getState, clearState} = URLStateHandler;
    const {user, userError, userLoading, isAuthenticated, authenticate} = authHandler;

    return (
        <h1>[Protected]</h1>
    )
}