import React from 'react';

import styles from './link.module.css' 

export default function Link({
    text='', 
    // href='',
    onClick=f=>f
}){

    return (
        <span 
            className={styles.link} 
            // href={href}
            onClick={onClick}
        >
            {text}
        </span>
    );
}

