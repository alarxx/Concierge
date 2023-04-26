import React from 'react';

import styles from './card.module.css' 

export default function CardBody({children}){

    return (
        <div className={styles["card__body"]}>
            {children}
        </div>
    );
}

