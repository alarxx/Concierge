import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import Navbar from '../../shared/ui/navbar/Navbar';
import NavbarLeft from '../../shared/ui/navbar/NavbarLeft';
import NavbarRight from '../../shared/ui/navbar/NavbarRight';
import NavbarCenter from '../../shared/ui/navbar/NavbarCenter';

export default function NavbarPanel({}){

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [title, setTitle] = useState('')

    useEffect(() => {
        console.log("PATHHHH", pathname)
        switch (pathname) {
            case '/new':
                setTitle('New')
                break;
            case '/orders':
                setTitle('Orders')
                break;
            case '/chat':
                setTitle('Chat')
                break;
            case '/profile':
                setTitle('Profile')
                break;
            case '/signin':
                setTitle('Авторизация')
                break;
            case '/signup':
                setTitle('Регистрация')
                break;
            default:
                setTitle('Title')
                break;
          }
      }, [pathname]);

    return (
        <Navbar>
            <NavbarLeft icon="" onClick={f=>f} />
            <NavbarCenter title={title} subtitle=''/> 
            <NavbarRight icon="" onClick={f=>f} />
        </Navbar>
            
    );
}

