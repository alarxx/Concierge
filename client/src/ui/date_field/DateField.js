import React from 'react';

import styles from './dateField.module.css' 

export default function DateField({
    updateFields=f=>f,
    date_value,
    date_value_key,
    placeholder='Выбрать'
}){

    function setField(key, date){
        const obj = {};
        obj[key] = date;
        updateFields(obj);
    }

    return (
        <input
            required
            type="date" 
            className={styles['input-date']}
            name={date_value_key}
            placeholder={placeholder}
            value={date_value}
            onChange={e => setField(date_value_key, e.target.value)}
        />
    );
}

