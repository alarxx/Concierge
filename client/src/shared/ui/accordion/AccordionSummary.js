import React from 'react';

import styles from './accordion.module.css' 

export default function AccordionSummary({children, onClick=f=>f}){

    return (
        <div className={styles.AccordionSummary} onClick={onClick}>
            {children}
        </div>
    );
}

