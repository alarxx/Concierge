import React from 'react';

import styles from './card.module.css' 

export default function Card({children}){

    return (
        <div class={styles.card}>
            {children}
        </div>
    );
}

