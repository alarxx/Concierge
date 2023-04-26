import React from 'react';

import styles from './cardSimple.module.css' 

export default function CardSimple({
    title='',
    description='',
    icon='',
    active=false,
    onClick=f=>f
}){

    return (
        <div className={`${styles['card-simple']} ${active ? styles['card-simple-active'] : ''} `}>
            <div className={styles['card-simple__icon']}>
                    {icon}
            </div>
            <div className={styles['card-simple__info']}>
                <div className={styles['card-simple__title']}>{title}</div>
                <div className={styles['card-simple__description']}>{description}</div>
            </div>
        </div>
    );
}

