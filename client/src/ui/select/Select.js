import React from 'react';

import styles from './select.module.css' 

export default function Select({text}){

    return (
        <div className={styles.select}>
            <div className={styles.select__label}>Выбрать</div>
            <div className={styles.icon}>

            </div>
        </div>
    );
}

