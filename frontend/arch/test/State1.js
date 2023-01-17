import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";

export default function State1(){
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/state2', {state: {key: "value"}});
    }, [])
    return <h1>State1</h1>
}