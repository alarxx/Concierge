import React from 'react';

import styles from './box.module.css' 

export default function Box({children}){
    return (
        <div className={styles.box}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}

