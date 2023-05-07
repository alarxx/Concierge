import React from 'react';

import styles from './card.module.css' 

export default function Card({children, variant='standard', top, bottom}){

    const style = {
        marginTop: top,
        marginBottom: bottom,
    }

    return (
        <div className={`${styles.card} ${variant === 'standard' ? '' : styles['card--info'] }`} style={style}>
            {children}
        </div>
    );
}

