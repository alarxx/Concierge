import React from 'react';

import styles from './accordion.module.css' 

export default function Accordion({children, expanded}){

    return (
        <div className={`
                ${styles.Accordion}
                ${expanded ? styles['Accordion-expanded'] : '' }
            `}
        >
            {children}
        </div>
    );
}

