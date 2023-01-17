import React, {useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom";

export default function State2(){
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        console.log(location);
        setTimeout(()=>navigate('/'), 1000*5)
    })
    return (<h1>State2</h1>);
}