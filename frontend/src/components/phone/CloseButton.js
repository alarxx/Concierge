import React from 'react'
import ClosePageIcon from "../../assets/icons/close-square.svg";
import {useNavigate} from "react-router-dom";

export default function CloseButton({onClick}){

    const navigate = useNavigate()

    return (
        <div className='close-page' onClick={e => onClick ? onClick(e) : navigate(-1, {replace: true})}>
            <ClosePageIcon />
        </div>
    );
}