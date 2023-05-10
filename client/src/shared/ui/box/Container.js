import React from 'react';

import styles from './box.module.css'

export default function Container({children, variant=''}){
    return (
        <div className={`${styles.container} `}>
            {/*<div className={styles.container}>*/}
            {children}
            {/*</div>*/}
        </div>
    );
}

