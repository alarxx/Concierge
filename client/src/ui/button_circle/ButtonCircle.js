import React from 'react';

import styles from './buttonCircle.module.css' 

export default function ButtonCircle({children, onClick=f=>f}){
    return (
        <button 
            className={`${styles.buttonCircle}`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
}

