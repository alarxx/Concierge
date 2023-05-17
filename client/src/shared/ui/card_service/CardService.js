import React from 'react';

import styles from './cardService.module.css'

export default function CardService({children, onClick=f=>f, isGrid=false, cursor}){

    const style = {
        cursor,
    }

    return (
        <div className={`${styles['card-service']} ${isGrid && styles['card-service--grid']}`} onClick={onClick} style={style}>
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

