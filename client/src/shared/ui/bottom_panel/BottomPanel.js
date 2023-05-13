import React from 'react';

import styles from './bottomPanel.module.css'

export default function BottomPanel({children}){

    return (
        <div className={styles["BottomPanel"]}>
            {children}
        </div>
    );
}

