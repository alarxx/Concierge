import React, { useEffect, useState } from 'react';

import styles from './button.module.css' 

export default function Button({children, type='', variant='main', size='', top, bottom, badge=false, onClick=f=>f}){

    const style = {
        marginTop: top,
        marginBottom: bottom,
    }

    const [btnVariant, setBtnVariant] = useState('main')

    useEffect(()=> {
        switch(variant){
            case('second'):
                setBtnVariant('second');
                break;
            case('control'):
                setBtnVariant('control');
                break;
            case('outline'):
                setBtnVariant('outline');
                break;
            case('outline-inverse'):
                setBtnVariant('outline-inverse');
                break;
            case('landing'):
                setBtnVariant('landing');
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
                    styles['btn--'+btnVariant]}
                ${styles['btn--'+ size] }
                ${badge ? styles['btn--badge'] : ''}
            `} 
            onClick={onClick}
            type={type}
            style={style}
        >
            {children}
        </button>
    );
}

