import React from 'react';

import styles from './circleButton.module.css' 

export default function CircleButton({children, onClick=f=>f}){
    return (
        <button 
            className={`${styles.circleButton}`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
}

