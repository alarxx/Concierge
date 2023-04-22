import React from 'react';

import styles from './card.module.css' 

export default function CardBody({children}){

    return (
        <div class={styles["card__body"]}>
            {children}
        </div>
    );
}

