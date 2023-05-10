import React from 'react';

import styles from './box.module.css' 

export default function Box({children, center=false, navbar=false, menu=false, yummy=false}){
    return (
        <div className={`
            ${styles.box} 
            ${center ? styles['box--center'] : ''}
            ${navbar ? styles['box--navbar'] : ''}
            ${menu ? styles['box--menu'] : ''}
            ${yummy ? styles['box--yummy'] : ''}
        `}>
            {/*<div className={styles.container}>*/}
                {children}
            {/*</div>*/}
        </div>
    );
}

