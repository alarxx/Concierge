import React, { Fragment, useEffect, useState } from 'react';

import Button from '../../shared/ui/button/Button'
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import Container from "../../shared/ui/box/Container";
import Typography from "../../shared/ui/typography/Typography";
import Logo from "../../shared/ui/logo/Logo";
import Block from "../../shared/ui/block/Block";
import Box from "../../shared/ui/box/Box";
import styles from './landing.module.css'
export default function Landing({}){

    const { authHandler } = useAppContext();
    const { user, authenticate, isAuthenticated } = authHandler;
    const navigate = useNavigate();

    /*
    // А если на Landing находится нужная информация?
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/profile', { replace: true });
        }
    })*/

    function setReactFavicon(){
        const favicon = document.querySelector('[rel=icon]');
        favicon.href = "https://reactjs.org/favicon.ico";
    }

    function setGoogleFavicon(){
        const favicon = document.querySelector('[rel=icon]');
        favicon.href = "https://www.google.com/favicon.ico";
    }

    function setFavicon(url){
        const favicon = document.querySelector('[rel=icon]');
        favicon.href = url;
    }

    return (<>
        <section className={styles["promoland"]}>
            <div className={styles["container"]}>
                <div className={styles["promoland__wrapper"]}>
                    <div className={styles["promoland__logo"]}>
                        <Logo />
                    </div>
                    <h1>
                        Самые продуктивные командировки и мероприятия
                    </h1>
                    <h2>
                        Позвольте себе не думать об организационных моментах
                    </h2>
                    <div className={styles["promoland__btns"]}>
                        {isAuthenticated && <Button variant={'landing'} onClick={e => navigate('/new')}>Заказать услугу</Button>}
                        {isAuthenticated && user.role === 'admin' && <Button variant={'landing'} onClick={e => navigate('/admin')}>Admin</Button>}
                        {!isAuthenticated && <Button variant={'landing'} onClick={e => authenticate({replace: false})}>Войти в систему</Button>}
                    </div>
                </div>
            </div>
        </section>
        {/*<button onClick={setReactFavicon}>Set React Favicon</button>*/}
        {/*<button onClick={setGoogleFavicon}>Set Google Favicon</button>*/}
    </>)
}