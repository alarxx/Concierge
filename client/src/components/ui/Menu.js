import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import HomeIcon from '../../assets/icons/home_FILL0_wght400_GRAD0_opsz48.svg'
import AwardsIcon from '../../assets/icons/workspace_premium_FILL0_wght400_GRAD0_opsz48.svg'
import BookIcon from '../../assets/icons/book_FILL0_wght400_GRAD0_opsz48.svg'
import ProfileIcon from '../../assets/icons/person_FILL0_wght400_GRAD0_opsz48.svg'

import styles from "../../assets/css/styles.css"
import menuStyles from "../../assets/css/menu.css"


export default function Menu(){
    const navigate = useNavigate();

    const { pathname } = useLocation();

    return (
        <div className="menu">
            <div className={`menu__li ${pathname==='/main'?'menu__li-active':''}`} onClick={e => navigate('/main', {replace: true,})}>
                <HomeIcon />
            </div>
            <div className={`menu__li ${pathname==='/voiting'?'menu__li-active':''}`} onClick={e => navigate('/voiting', {replace: true,})}>
                <BookIcon />
            </div>
            <div className={`menu__li ${pathname==='/awards'?'menu__li-active':''}`} onClick={e => navigate('/awards', {replace: true,})}>
                <AwardsIcon />
            </div>
            <div className={`menu__li ${pathname==='/profile'?'menu__li-active':''}`} onClick={e => navigate('/profile', {replace: true,})}>
                <ProfileIcon />
            </div>
        </div>
    );
}

