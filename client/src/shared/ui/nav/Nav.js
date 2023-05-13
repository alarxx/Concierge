import React from 'react';

import styles from './nav.module.css'
export default function Nav({children, left, right, block}){

    const style = {
        marginRight: right,
        marginLeft: left,
    }

    return (
        <nav style={style} className={styles.nav}>
            <ul className={`
                ${styles['nav-ul']}
                ${block && styles['nav--block']}
            `}>
                {children}
            </ul>
        </nav>
    );
}

