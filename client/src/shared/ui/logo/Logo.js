import React from 'react';

import styles from './logo.module.css' ;
const logo = require('../../../assets/images/logo.png');
export default function Logo(){

    return (
        <div className={styles.logo}>
            <img src={String(logo)}/>
        </div>
    );
}

