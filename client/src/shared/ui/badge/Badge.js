import React from 'react';

import styles from './badge.module.css'

export default function Badge({text=''}){
    return (
        <div
            className={`
                ${styles.Badge} 
            `}
        >
            {text}
        </div>
    );
}

