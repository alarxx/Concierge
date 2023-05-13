import React from 'react';

import styles from './nav.module.css'
export default function NavLink({text, onClick=f=>f}){

    return (
        <li className={styles["nav-link"]}>
            <span onClick={onClick}>{text}</span>
        </li>
    );
}

