import React from 'react';

import styles from './chip.module.css' 

export default function Chip({text='', variant='', size='normal'}){
    return (
        <div 
            className={`${styles.chip} 
                ${variant !== '' ? styles['chip-'+variant] : styles['chip-blue'] }
                ${size == 'normal' ? '' : styles['chip-small'] }
            `} 
        >
            {text}
        </div>
    );
}

