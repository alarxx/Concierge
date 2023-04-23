import React from 'react';

import styles from './navigation.module.css' 


export default function Navigation({children}){

    return (
        <div className={styles["navigation"]}>
            {children}    
        </div>
    );
}

