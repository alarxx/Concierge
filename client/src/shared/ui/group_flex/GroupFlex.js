import React from 'react';

import styles from './groupFlex.module.css' 

export default function GroupFlex({align='aic', justify='jcsb', wrap=false, width='', children, className}){

    const style = {
        width: width,
    }

    return (
        <div style={style} className={`${className} ${styles.GroupFlex} ${styles['GroupFlex-'+align]} ${styles['GroupFlex-'+justify]} ${wrap ? styles['GroupFlex-wrap']: ''}`}>
            {children}
        </div>
    );
}

