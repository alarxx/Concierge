import React from 'react';

import styles from './button.module.css' 

export default function Button({children, onClick=f=>f}){
    return (
        <button 
            className={`${styles.btn} ${styles['btn-main']}`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
}

