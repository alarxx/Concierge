import React from 'react';

import styles from './box.module.css' 

export default function Box({children, variant=''}){
    return (
        <div className={`${styles.box} ${variant ? styles['box-center'] : ''}`}>
            {/*<div className={styles.container}>*/}
                {children}
            {/*</div>*/}
        </div>
    );
}

