import React from 'react';

import styles from "../../assets/css/styles.css"
import inputStyles from "../../assets/css/input.css"

export default function Input({
                                  placeholder="Введите данные",
                                  name="_",
                                  type="text",
                                  value="",
                                  updateFields=f=>f,
                                  // Что за tip?
                                  tip="",
                                  required=false
}){

    return (
        <div className='input-form'>
            <div className='inputLabel'>{tip}</div>
            <input name={name} type={type} className="input" placeholder={placeholder} value={value} onChange={e=>updateFields({[name]: e.target.value})} required={required} />
        </div>
    );
}

