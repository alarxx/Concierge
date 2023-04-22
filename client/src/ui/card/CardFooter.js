import React from 'react';

import styles from './card.module.css' 

export default function CardFooter({children}){

    return (
        <div class={styles["card__footer"]}>
            {children}
        </div>
    );
}

