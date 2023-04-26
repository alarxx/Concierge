import React from 'react';

import styles from './typography.module.css' 

export default function Typography({children, size="", weight="", bottom=""}){

    const fontStyle = {
        "font-weight": weight,
        "font-size": size, 
        "padding-bottom": bottom,
    }

    return (
        <span className={styles.Typography} style={fontStyle}>
            {children}
        </span>
    );
}

