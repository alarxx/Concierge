import React, {useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import {Navigate} from "react-router-dom";

export default function Logout(){
    const {loading, data, error} = useFetch('/auth/logout', {method: 'DELETE'});
    return <Navigate to="/" />;
}