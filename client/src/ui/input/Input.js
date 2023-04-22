import React from 'react';

import styles from './input.module.css' 

export default function Input({
    placeHolder="Введите значение",
    updateFields=f=>f,
    value = "",
    field_key="",
    type="text",
    required=false
}){

    // пересмотреть это
    function setField(value){
        // check(value);
        const obj = {};
        obj[field_key] = value;
        updateFields(obj);
    }

    return (
        <input
            type={type}
            required={required}
            className={styles.input}
            placeholder={placeHolder}
            value={value}
            onChange={e => setField(e.target.value)}
        />
    );
}

