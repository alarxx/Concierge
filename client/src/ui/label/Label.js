import React from 'react';

import styles from './label.module.css' 

export default function Label({text}){

    // text or {children} ??
    return (
        <label className={styles.label}>
            {text}
        </label>
    );
}

