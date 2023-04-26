import React from 'react';

import styles from './input.module.css' 

export default function Input({
    placeHolder="Введите значение",
    onChange=f=>f,
    value="",
    name="_",
    type="text",
    required=false
}){

    return (
        <input
            className={styles.input}
            name={name}
            placeholder={placeHolder}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
}

