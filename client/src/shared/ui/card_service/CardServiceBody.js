import React from 'react';

import styles from './cardService.module.css'

export default function CardServiceBody({children}){

    return (
        <div className={styles["card-service__body"]}>
            {children}
        </div>
    );
}

