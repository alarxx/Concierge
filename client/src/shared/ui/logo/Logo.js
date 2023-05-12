import React from 'react';

import styles from './logo.module.css' ;
import LogoIcon from '../../../assets/icons/logo.svg';

export default function Logo(){

    return (
        <div className={styles.logo}>
            <LogoIcon />
        </div>
    );
}

