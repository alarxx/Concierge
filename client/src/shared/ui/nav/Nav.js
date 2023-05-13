import React from 'react';

import styles from './nav.module.css'
export default function Nav({children, left, right}){

    const style = {
        marginRight: right,
        marginLeft: left,
    }

    return (
        <nav style={style}>
            <ul className={styles.nav}>
                {children}
            </ul>
        </nav>
    );
}

