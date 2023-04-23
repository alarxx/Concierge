import React from 'react';

import styles from './card.module.css' 

export default function CardFooter({children}){

    return (
        <div className={styles["card__footer"]}>
            {children}
        </div>
    );
}

