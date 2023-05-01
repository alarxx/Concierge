import React from 'react';

import styles from './checkboxCustom.module.css'

export default function RadioCustom({ name='_', label='', isChecked=false, isDisabled=false, required=false, onChange=f=>f }){

    return (
        <label className={styles.CheckboxCustom}>
            <input name={name} type="radio" onChange={onChange} required={required} />
            <span>{label}</span>
        </label>
    );
}

