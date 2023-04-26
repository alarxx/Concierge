import React from 'react';

import styles from './bottomControl.module.css' 

export default function BottomControl({children}){

    return (
        <div className={`
            ${styles["BottomControl"]} 
        `}>
            {children}
        </div>
    );
}

