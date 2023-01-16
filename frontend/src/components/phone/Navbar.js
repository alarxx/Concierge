import React from 'react'

import ArrowLeft from '../../icons/arrow-left.svg'
import InfoCirce from '../../icons/info-circle.svg'
import {useNavigate} from "react-router-dom";

export default function Navbar({
                                   title,
                                   back=false,
                                   back_url='',
                                   info=false,
                                   onBackClick=f=>f,
                                   onInfoClick=f=>f,
}){
    return (

        <div className="navbar">
            {(back || back_url) &&
            <div className="navbar__left backbtn-control" onClick={onBackClick}>
                <ArrowLeft />
            </div>}

            {title &&
            <div className="navbar__title">
                {title}
            </div>}

            {info &&
            <div className="navbar__right info-control" onClick={onInfoClick}>
                <InfoCirce />
            </div>}
        </div>
    )
}