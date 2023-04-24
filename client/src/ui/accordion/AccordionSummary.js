import React from 'react';

import styles from './accordion.module.css' 

export default function AccordionSummary({children}){

    return (
        <div className={styles.AccordionSummary}>
            {children}
        </div>
    );
}

