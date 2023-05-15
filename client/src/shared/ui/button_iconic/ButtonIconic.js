import React, { useEffect, useState } from 'react';

import styles from './buttonIconic.module.css'

export default function ButtonIconic({children, type='', top, bottom, inText=false, onClick=f=>f}){

    const style = {
        marginTop: top,
        marginBottom: bottom,
    }

    return (
        <button
            className={`
                ${styles.ButtonIconic}
                ${inText && styles['ButtonIconic--in-text']}
            `}
            onClick={onClick}
            type={type}
            style={style}
        >
            {children}
        </button>
    );
}

