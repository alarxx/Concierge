import React from 'react';

import styles from './accordion.module.css' 

export default function AccordionDetails({children}){

    return (
        <div className={styles.AccordionDetails}>
            {children}
        </div>
    );
}

