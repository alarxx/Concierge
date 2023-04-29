import React from 'react';

import styles from './cardService.module.css'

export default function CardServiceFooter({children}){

    return (
        <div className={styles["card-service__footer"]}>
            {children}
        </div>
    );
}

