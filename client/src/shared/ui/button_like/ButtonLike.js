import React from 'react';

import styles from './buttonLike.module.css' 

import HeartIcon from '../../../assets/icons/Property 1=heart.svg'

export default function ButtonLike({variant='outline', size='small', active=false, onClick=f=>f}){
    return (
        <button 
            className={`
                ${styles.ButtonLike}
                ${variant==='fill' ? styles['ButtonLike-fill'] : styles['ButtonLike-outline'] }
                ${size==='big' ? styles['ButtonLike-big'] : styles['ButtonLike-small'] }
                ${active ? styles['ButtonLike-active'] : '' }
            `} 
            onClick={onClick}
        >
            <HeartIcon />
        </button>
    );
}

