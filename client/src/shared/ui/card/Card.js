import React from 'react';

import styles from './card.module.css' 

export default function Card({children, variant='standard'}){

    return (
        <div className={`${styles.card} ${variant === 'standard' ? '' : styles['card--info'] }`}>
            {children}
        </div>
    );
}

