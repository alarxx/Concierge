import React from 'react';

import styles from './navbar.module.css' 


export default function Navbar({children}){

    return (
        <nav className={styles.nav}>
            {children}
        </nav>
    );
}

