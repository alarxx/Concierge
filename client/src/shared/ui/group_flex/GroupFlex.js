import React from 'react';

import styles from './groupFlex.module.css' 

export default function GroupFlex({align='aic', justify='jcsb', wrap=false, children}){

    return (
        <div className={`${styles.GroupFlex} ${styles['GroupFlex-'+align]} ${styles['GroupFlex-'+justify]} ${wrap ? styles['GroupFlex-wrap']: ''}`}>
            {children}
        </div>
    );
}

