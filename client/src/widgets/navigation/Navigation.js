import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import styles from './navigation.module.css' 

import BottomNavigationAction from '../../ui/bottom_navigation_action/BottomNavigationAction'

import NewIcon from '../../assets/icons/Property 1=new.svg'
import OrdersIcon from '../../assets/icons/Property 1=orders.svg'
import ChatIcon from '../../assets/icons/Property 1=chat.svg'
import ProfileIcon from '../../assets/icons/Property 1=profile.svg'

export default function Navigation({}){
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // const [activeItem, setActiveItem] = useState('');

    // const handleClick = (label) => {
    //     setActiveItem(label);
    //     navigate('/'+label, {replace: true,})
    // };

    return (
        <div class={styles["navigation"]}>
            <BottomNavigationAction label='Main' icon={<NewIcon/>} active={pathname === '/'} onClick={e => navigate('/', {replace: true,})}  />
            <BottomNavigationAction label='New' icon={<NewIcon/>} active={pathname === '/new'} onClick={e => navigate('/new', {replace: true,})}  />
            <BottomNavigationAction label='Orders' icon={<OrdersIcon/>} active={pathname === '/orders'} onClick={e => navigate('/orders', {replace: true,})}  />
            <BottomNavigationAction label='Chat' icon={<ChatIcon/>} active={pathname === '/chat'} onClick={e => navigate('/chat', {replace: true,})}  />
            <BottomNavigationAction label='Profile' icon={<ProfileIcon/>} active={pathname === '/profile'} onClick={e => navigate('/profile', {replace: true,})}  />
        </div>
    );
}

