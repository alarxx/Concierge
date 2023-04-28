import React from 'react';

import styles from './navbar.module.css' 


export default function NavbarRight({Icon, onClick=f=>f}){

    return (<>
        {Icon && <button className={styles["nav__left"]} onClick={onClick}>
            {Icon}
        </button>}
    </>);
}

