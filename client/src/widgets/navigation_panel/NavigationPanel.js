import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import BottomNavigationAction from '../../shared/ui/bottom_navigation_action/BottomNavigationAction'
import Navigation from '../../shared/ui/navigation/Navigation'

import NewIcon from '../../assets/icons/Property 1=new.svg'
import MainIcon from '../../assets/icons/home_FILL0_wght400_GRAD0_opsz48.svg'
import OrdersIcon from '../../assets/icons/Property 1=orders.svg'
import ChatIcon from '../../assets/icons/Property 1=chat.svg'
import ProfileIcon from '../../assets/icons/category.svg'

export default function NavigationPanel({ }){
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // подумать над неймингом роутов
    return (
        <Navigation>
            <BottomNavigationAction label='Главная' icon={<MainIcon/>} active={pathname.startsWith('/new')} onClick={e => navigate('/new', {replace: true,})}  />
            <BottomNavigationAction label='Заказы' icon={<OrdersIcon/>} active={pathname.startsWith('/orders')} onClick={e => navigate('/orders', {replace: true,})}  />
            <BottomNavigationAction label='Чат' icon={<ChatIcon/>} active={pathname.startsWith('/chat')} onClick={e => navigate('/chat', {replace: true,})}  />
            <BottomNavigationAction label='Сервисы' icon={<ProfileIcon/>} active={pathname.startsWith('/profile')} onClick={e => navigate('/profile', {replace: true,})}  />
        </Navigation>
    );
}

