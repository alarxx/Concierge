import React from 'react';

import styles from './buttonPlus.module.css'
import PlusIcon from '../../../assets/icons/add.svg'

export default function ButtonPlus({size='', onClick=f=>f}){
    return (
        <button
            className={`${styles.buttonPlus}
                ${size ? styles['buttonPlus-big'] : ''}
            `}
            onClick={onClick}
        >
            <PlusIcon/>
        </button>
    );
}

