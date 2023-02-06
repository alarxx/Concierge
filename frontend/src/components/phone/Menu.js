import React from 'react'

import Category from '../../assets/icons/category.svg'
import House from '../../assets/icons/house.svg'
import Message from '../../assets/icons/messages-3.svg'
import {useNavigate} from "react-router-dom";

export default function Menu(){
    const navigate = useNavigate();

    return (
        <div className="menu">
            <div className="menu__wrapper">
                <ul className="menu__links">
                    <li className="menu__li">
                        <div className="menu__icon" onClick={e => navigate('/profile', {replace: true,})}>
                            <Category width="28" height="28" viewBox="0 0 28 28"/>
                        </div>
                    </li>
                    <li className="menu__li">
                        <div className="menu__icon" onClick={e => navigate('/chat', {replace: true,})}>
                            <Message width="28" height="28" viewBox="0 0 28 28" />
                        </div>
                    </li>
                    <li className="menu__li">
                        <div className="menu__icon" onClick={e => navigate('/', {replace: true,})}>
                            <House width="28" height="28" viewBox="0 0 28 28"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}