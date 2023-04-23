import React from 'react';

import styles from './button.module.css' 

export default function Button({children, variant='main', onClick=f=>f}){
    return (
        <button 
            className={`${styles.btn} ${variant === 'main' ? styles['btn-main'] : styles['btn-second'] }`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
}

