import React from 'react';

import styles from './logo.module.css' ;

export default function Logo(){

    return (
        <div className={styles.logo}>
            <img src={'/images/logo.png'}/>
        </div>
    );
}

