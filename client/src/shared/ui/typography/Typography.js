import React from 'react';

import styles from './typography.module.css' 

export default function Typography({children, size="", weight="", bottom=""}){

    // в children передаем только текст

    const fontStyle = {
        fontWeight: weight,
        fontSize: size,
        paddingBottom: bottom,
    }

    return (
        <span className={styles.Typography} style={fontStyle}>
            {children}
        </span>
    );
}

