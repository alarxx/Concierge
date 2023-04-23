import React from 'react';

import styles from './navbar.module.css' 

export default function Navbar({title='', subtitle=''}){

    return (
        <nav className=''>
            <div className={styles["nav__left"]}>
    
            </div>
            <div className={styles["nav__center"]}>
                <div className={styles["nav__title"]}>
                    {title}
                </div>
                <div className={styles["nav__subtitle"]}>
                    {subtitle}
                </div>
            </div>
            <div className={styles["nav__right"]}>
    
            </div>
        </nav>
    );
}

