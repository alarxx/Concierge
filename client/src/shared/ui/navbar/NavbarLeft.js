import React from 'react';

import styles from './navbar.module.css' 


export default function NavbarLeft({icon="", onClick=f=>f}){

    return (
        <button className={styles["nav__left"]} onClick={onClick}>
            {icon}
        </button>
    );
}

