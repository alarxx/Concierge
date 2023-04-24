import React from 'react';

import styles from './accordion.module.css' 

export default function Accordion({children, expanded, onClick=f=>f}){

    return (
        <div className={`
                ${styles.Accordion}
                ${expanded ? styles['Accordion-expanded'] : '' }
            `}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

