import React from 'react';

import styles from './cardService.module.css'

export default function CardService({children}){

    return (
        <div className={styles['card-service']}>
            {/*<div className={styles["card-service__header"]}>*/}
            {/*</div>*/}
            {/*<div className={styles["card-service__body"]}>*/}

            {/*</div>*/}
            {/*<div className={styles["card-service__footer"]}>*/}

            {/*</div>*/}
            {children}
        </div>
    );
}

