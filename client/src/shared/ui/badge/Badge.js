import React from 'react';

import styles from './badge.module.css'

export default function Badge({text='', air=false, top, bottom, right, left}){

    const style = {
        top: top,
        bottom: bottom,
        right: right,
        left: left,
    }

    return (
        <div
            className={`
                ${styles.Badge} 
                ${air ? styles['Badge--air'] : ''}
            `}
            style={style}
        >
            {text}
        </div>
    );
}

