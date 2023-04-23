import React from 'react';

import styles from './navbar.module.css' 


export default function NavbarRight({icon="", onClick=f=>f}){

    return (
        <button className={styles["nav__right"]} onClick={onClick}>
            {icon}
        </button>
    );
}

