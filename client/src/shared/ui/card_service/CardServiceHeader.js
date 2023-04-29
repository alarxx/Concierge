import React from 'react';

import styles from './cardService.module.css'

export default function CardServiceHeader({children}){

    return (
        <div className={styles["card-service__header"]}>
            {children}
        </div>
    );
}

