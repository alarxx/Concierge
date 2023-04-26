import React from 'react';

import styles from './groupButtons.module.css' 

export default function GroupButtons({children}){

    return (
        <div className={styles.GroupButtons}>
            {children}
        </div>
    );
}

