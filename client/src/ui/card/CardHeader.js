import React from 'react';

import styles from './card.module.css' 

export default function CardHeader({children}){

    return (
        <div className={styles["card__header"]}>
            {children}
        </div>
    );
}

