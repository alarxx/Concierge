import React, { useEffect, useState } from 'react';

import styles from './buttonIconic.module.css'

export default function ButtonIconic({children, type='', variant='main', size='', top, bottom, onClick=f=>f}){

    const style = {
        marginTop: top,
        marginBottom: bottom,
    }

    return (
        <button
            className={`
                ${styles.ButtonIconic}
            `}
            onClick={onClick}
            type={type}
            style={style}
        >
            {children}
        </button>
    );
}

