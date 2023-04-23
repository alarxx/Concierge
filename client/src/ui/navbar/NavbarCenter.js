import React from 'react';

import styles from './navbar.module.css' 


export default function NavbarCenter({title="", subtitle=""}){

    return (
        <div className={styles["nav__center"]}>
            <div className={styles["nav__title"]}>
                {title}
            </div>
            <div className={styles["nav__subtitle"]}>
                {subtitle}
            </div>
        </div>
    );
}

