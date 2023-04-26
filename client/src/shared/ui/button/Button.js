import React, { useEffect, useState } from 'react';

import styles from './button.module.css' 

export default function Button({children, type='', variant='main', onClick=f=>f}){

    const [btnVariant, setBtnVariant] = useState('main')

    useEffect(()=> {
        switch(variant){
            case('second'):
                setBtnVariant('second');
                break;
            case('control'):
                setBtnVariant('control');
                break;
            default:
                setBtnVariant('main');
                break;
        }

    }, [variant])

    return (
        <button 
            className={`
                ${styles.btn} ${
                    // variant === 'main' ? styles['btn-main'] : 
                    styles['btn-'+btnVariant]}
            `} 
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}

