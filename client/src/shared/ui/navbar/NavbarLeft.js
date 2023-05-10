import React from 'react';

import styles from './navbar.module.css'
import ButtonIconic from "../button_iconic/ButtonIconic";

export default function NavbarLeft({Icon, onClick=f=>f}){

    return (<>
        {Icon && <div className={styles["nav__left"]}>
            <ButtonIconic onClick={onClick}>{Icon}</ButtonIconic>
        </div>}
    </>);
}

