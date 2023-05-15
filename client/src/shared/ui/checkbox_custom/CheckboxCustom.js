import React from 'react';

import styles from './checkboxCustom.module.css'

// TO DO: сделать режим фокусировки при нажатии TAB
export default function CheckboxCustom({ name='_', label='', isChecked=false, isDisabled=false }){

    return (
        <label className={styles.CheckboxCustom}>
            <input name={name} type="checkbox"  />
            <span>{label}</span>
        </label>
    );
}

