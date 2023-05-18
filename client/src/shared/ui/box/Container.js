import React from 'react';

import styles from './box.module.css'

export default function Container({children, variant='', padding, ref}){

    const style = {
        padding
    }
    return (
        <div className={`${styles.container} `} style={style} ref={ref}>
            {/*<div className={styles.container}>*/}
            {children}
            {/*</div>*/}
        </div>
    );
}

