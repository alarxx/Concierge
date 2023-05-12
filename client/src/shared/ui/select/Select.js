import React from 'react';

import styles from './select.module.css' 

export default function Select({title, options,selectedValue, onChange=f=>f}){

    return (
        <div className={styles['custom-select']}>
            <div className={styles.select__label}>{title}</div>
            {/* <div className={styles.icon}>

            </div> */}
            <select value={selectedValue} onChange={onChange}>
                {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
        </div>
    );
}

