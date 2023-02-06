import React, {useEffect} from 'react'

import Category from '../../assets/icons/category.svg'
import User from '../../assets/icons/user.svg'
import Message from '../../assets/icons/messages-3.svg'
import {useLocation, useNavigate} from "react-router-dom";

export default function Menu(){
    const navigate = useNavigate();

    const { pathname } = useLocation();

    return (
        <div className="menu">
            <div className="menu__wrapper">
                <ul className="menu__links">
                    <li className="menu__li">
                        <div className={`menu__icon ${pathname==='/profile'?'menu__icon-active':''}`} onClick={e => navigate('/profile', {replace: true,})}>
                            <Category width="28" height="28" viewBox="0 0 28 28"/>
                        </div>
                    </li>
                    <li className="menu__li">
                        <div className={`menu__icon ${pathname==='/chat'?'menu__icon-active':''}`} onClick={e => navigate('/chat', {replace: true,})}>
                            <Message width="28" height="28" viewBox="0 0 28 28" />
                        </div>
                    </li>
                    <li className="menu__li">
                        <div className={`menu__icon ${pathname==='/'?'menu__icon-active':''}`} onClick={e => navigate('/', {replace: true,})}>
                            <User width="28" height="28" viewBox="0 0 28 28"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}